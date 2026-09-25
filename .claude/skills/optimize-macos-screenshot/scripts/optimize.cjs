#!/usr/bin/env node
"use strict";

/**
 * Losslessly recompress PNG screenshots.
 *
 * Two levers, both bit-exact on the decoded pixels:
 *   1. drop the alpha channel when every pixel is fully opaque
 *   2. re-deflate at zlib level 9 with no palette quantisation
 *
 * Every candidate is verified before it is written: the decoded raw pixels of
 * the new file must hash identically to the decoded raw pixels of the original
 * (minus the alpha channel, when that channel was dropped). A file that fails
 * the check, or that does not get smaller, is left untouched.
 */

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

function loadSharp() {
	const candidates = [
		"sharp",
		path.join(process.cwd(), "node_modules", "sharp"),
		path.join(process.cwd(), "node_modules", "@11ty", "eleventy-img", "node_modules", "sharp"),
	];
	for (const id of candidates) {
		try {
			return require(id);
		} catch {
			/* try next */
		}
	}
	console.error(
		"sharp not found. Run from a project that depends on sharp (directly or via\n" +
			"@11ty/eleventy-img), or install it: npm install --no-save sharp",
	);
	process.exit(1);
}

const sharp = loadSharp();

const sha = buffer => crypto.createHash("sha256").update(buffer).digest("hex");
const kb = bytes => String(Math.round(bytes / 1024)).padStart(5) + "K";

function parseArgs(argv) {
	const opts = { dryRun: false, keepIcc: false, inputs: [] };
	for (const arg of argv) {
		if (arg === "--dry-run") opts.dryRun = true;
		else if (arg === "--keep-icc") opts.keepIcc = true;
		else if (arg.startsWith("-")) {
			console.error(`unknown flag: ${arg}`);
			process.exit(1);
		} else opts.inputs.push(arg);
	}
	return opts;
}

function collectPngs(inputs) {
	const files = [];
	for (const input of inputs) {
		const stat = fs.statSync(input);
		if (stat.isDirectory()) {
			for (const entry of fs.readdirSync(input).sort()) {
				if (entry.toLowerCase().endsWith(".png")) files.push(path.join(input, entry));
			}
		} else {
			files.push(input);
		}
	}
	return files;
}

/** Drop the last channel of an interleaved raw buffer. */
function stripLastChannel(raw, pixels, channels) {
	const kept = channels - 1;
	const out = Buffer.allocUnsafe(pixels * kept);
	for (let p = 0; p < pixels; p++) {
		const from = p * channels;
		const to = p * kept;
		for (let c = 0; c < kept; c++) out[to + c] = raw[from + c];
	}
	return out;
}

async function optimize(file, opts) {
	const originalSize = fs.statSync(file).size;
	const meta = await sharp(file).metadata();

	// 16-bit sources cannot be compared through sharp's 8-bit raw output.
	if (meta.depth && meta.depth !== "uchar") {
		return { file, originalSize, status: "skipped", reason: `depth ${meta.depth}` };
	}

	const { data: raw, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
	const opaque = (await sharp(file).stats()).isOpaque;
	const dropAlpha = opaque && info.channels > 1 && meta.hasAlpha;

	const expected = dropAlpha
		? stripLastChannel(raw, info.width * info.height, info.channels)
		: raw;

	let pipeline = sharp(file);
	if (dropAlpha) pipeline = pipeline.removeAlpha();
	if (opts.keepIcc) pipeline = pipeline.keepIccProfile();

	// palette:false is load-bearing. Passing `effort`, `quality`, `colours` or
	// `dither` to sharp's png() implicitly flips palette:true, which quantises
	// the image — a lossy result that is easy to mistake for a lossless one.
	const out = await pipeline.png({ compressionLevel: 9, palette: false }).toBuffer();

	const actual = await sharp(out).raw().toBuffer();
	if (sha(actual) !== sha(expected)) {
		return { file, originalSize, status: "skipped", reason: "pixels differ" };
	}
	if (out.length >= originalSize) {
		return { file, originalSize, newSize: out.length, status: "skipped", reason: "no gain" };
	}

	if (!opts.dryRun) fs.writeFileSync(file, out);
	return { file, originalSize, newSize: out.length, status: "ok", dropAlpha };
}

async function main() {
	const opts = parseArgs(process.argv.slice(2));
	if (opts.inputs.length === 0) {
		console.error("usage: optimize.cjs [--dry-run] [--keep-icc] <file|dir>...");
		process.exit(1);
	}

	const files = collectPngs(opts.inputs);
	if (files.length === 0) {
		console.error("no .png files found");
		process.exit(1);
	}

	let before = 0;
	let after = 0;
	const skipped = [];

	for (const file of files) {
		const r = await optimize(file, opts);
		if (r.status !== "ok") {
			skipped.push(`${path.basename(r.file)} (${r.reason})`);
			continue;
		}
		before += r.originalSize;
		after += r.newSize;
		console.log(
			`${kb(r.originalSize)} -> ${kb(r.newSize)}  ${r.dropAlpha ? "alpha dropped" : "alpha kept   "}  ${r.file}`,
		);
	}

	const mb = n => (n / 1024 / 1024).toFixed(2) + " MB";
	const pct = before ? Math.round(100 - (after / before) * 100) : 0;
	const label = opts.dryRun ? "DRY RUN" : "WRITTEN";
	console.log(
		`\n${label}: ${files.length - skipped.length}/${files.length} files, ${mb(before)} -> ${mb(after)} (-${pct}%)`,
	);
	if (skipped.length > 0) console.log(`untouched: ${skipped.join(", ")}`);
}

main().catch(error => {
	console.error(error);
	process.exit(1);
});