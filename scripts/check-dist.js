// Validates the built site (`npm run build` first).
//
// Runs html-validate on every generated page plus a few project rules that
// guard against mistakes we already shipped once (missing trailing slashes on
// internal links, pages without meta description, images without dimensions).
// Also checks that the feed lists exactly the published articles.

import fs from "node:fs";
import path from "node:path";
import {
	HtmlValidate,
	Rule,
	StaticConfigLoader,
	formatterFactory,
	staticResolver,
} from "html-validate";

const outdir = process.env.npm_package_config_outdir ?? "dist";

class InternalLinkTrailingSlash extends Rule {
	setup() {
		this.on("dom:ready", ({ document }) => {
			for (const link of document.querySelectorAll("a[href]")) {
				const href = link.getAttributeValue("href");
				if (typeof href !== "string" || !href.startsWith("/")) continue;
				const [pathname] = href.split(/[?#]/);
				// files like /feed.xml or /static/x.pdf don't get a slash
				if (pathname.endsWith("/") || path.extname(pathname)) continue;
				this.report(link, `internal link "${href}" must end with "/"`);
			}
		});
	}
}

class MetaDescription extends Rule {
	setup() {
		this.on("dom:ready", ({ document }) => {
			const meta = document.querySelector('meta[name="description"]');
			const content = meta?.getAttributeValue("content");
			if (typeof content !== "string" || !content.trim()) {
				this.report(
					document.querySelector("head"),
					'page must have a non-empty <meta name="description">',
				);
			}
		});
	}
}

class ImageDimensions extends Rule {
	setup() {
		this.on("dom:ready", ({ document }) => {
			for (const img of document.querySelectorAll("img")) {
				const src = img.getAttributeValue("src");
				if (typeof src === "string" && src.startsWith("data:")) continue;
				if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
					this.report(img, "<img> must have width and height attributes");
				}
			}
		});
	}
}

const plugin = {
	name: "focus-shift",
	rules: {
		"focus-shift/internal-link-trailing-slash": InternalLinkTrailingSlash,
		"focus-shift/meta-description": MetaDescription,
		"focus-shift/image-dimensions": ImageDimensions,
	},
};

const config = {
	root: true,
	extends: ["html-validate:recommended"],
	plugins: ["focus-shift"],
	rules: {
		"focus-shift/internal-link-trailing-slash": "error",
		"focus-shift/meta-description": "error",
		"focus-shift/image-dimensions": "error",

		// html-minifier-terser writes `<!doctype html>`
		"doctype-style": "off",
		// markdown-it-anchor generates heading ids like "1-gegenstand", valid in HTML5
		"valid-id": "off",

		// style preferences we don't follow
		"attribute-boolean-style": "off",
		"attribute-empty-style": "off",
		"long-title": "off",
		"no-inline-style": "off",
		"prefer-native-element": "off",
		"script-type": "off",
		"tel-non-breaking": "off",

		// known findings, to be fixed and re-enabled one by one
		"element-required-attributes": "off",
		"input-attributes": "off",
		"no-autoplay": "off",
		"no-implicit-button-type": "off",
		"no-raw-characters": "off",
		"unique-landmark": "off",
		"wcag/h32": "off",
	},
};

const isRedirectPage = file =>
	fs.readFileSync(file, "utf8").includes('http-equiv="refresh"');

const files = fs
	.readdirSync(outdir, { recursive: true })
	.filter(entry => entry.endsWith(".html"))
	.map(entry => path.join(outdir, entry))
	.filter(file => !isRedirectPage(file))
	.sort();

if (files.length === 0) {
	console.error(
		`No html files found in "${outdir}". Run "npm run build" first.`,
	);
	process.exit(1);
}

const loader = new StaticConfigLoader(
	[staticResolver({ plugins: { "focus-shift": plugin } })],
	config,
);
const htmlvalidate = new HtmlValidate(loader);

const results = [];
let valid = true;
for (const file of files) {
	const report = await htmlvalidate.validateFile(file);
	results.push(...report.results);
	valid &&= report.valid;
}

if (results.length > 0) {
	console.log(formatterFactory("stylish")(results));
}

// The feed once looped over a collection that didn't exist and stayed empty
// without anyone noticing. Every built article must be in the feed, and every
// feed entry must link to a built page (drafts are not written to disk).
function checkFeed() {
	const feedUrl = "https://focus-shift.de";
	const feed = fs.readFileSync(path.join(outdir, "feed.xml"), "utf8");
	const entries = [...feed.matchAll(/<entry>[\s\S]*?<\/entry>/g)].map(
		([entry]) => entry,
	);
	const linked = new Set(
		entries.map(entry => {
			const href = entry.match(/<link href="([^"]*)"/)?.[1] ?? "";
			return decodeURI(href.replace(feedUrl, ""));
		}),
	);

	const articles = fs
		.readdirSync(path.join(outdir, "neuigkeiten"))
		.filter(name => /^\d{4}-\d{2}-\d{2}-/.test(name))
		.map(name => `/neuigkeiten/${name}/`);

	const errors = [];
	if (entries.length === 0) {
		errors.push("feed.xml has no entries");
	}
	for (const article of articles.filter(article => !linked.has(article))) {
		errors.push(`article ${article} is missing in feed.xml`);
	}
	for (const link of linked) {
		if (!fs.existsSync(path.join(outdir, link, "index.html"))) {
			errors.push(`feed.xml links to ${link}, which was not built`);
		}
	}
	return { entries: entries.length, errors };
}

const feed = checkFeed();
for (const error of feed.errors) {
	console.error(error);
}

if (!valid || feed.errors.length > 0) {
	process.exit(1);
}

console.log(
	`${files.length} pages and ${feed.entries} feed entries checked, no problems found.`,
);
