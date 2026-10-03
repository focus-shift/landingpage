// Checks the dashes in the page sources (German typography, see CLAUDE.md).
//
// The site wrote the Gedankenstrich four different ways (" - ", " – ", " — "
// and "&ndash;"). Only the literal en dash "–" is allowed: the em dash is
// English typography, and entities end up as visible text when a front matter
// title or description is rendered escaped with {{title}}.

import fs from "node:fs";
import path from "node:path";

const root = "src";

const everywhere = [
	{ pattern: /—/g, message: 'em dash "—", use "–"' },
	{
		pattern: /&(ndash|mdash|#821[12]|#x201[34]);/gi,
		message: 'dash entity, write the character "–" instead',
	},
];

const prose = [
	{
		pattern: /[\p{L}.,!?)*_"”’] - [\p{L}(*_„"]/gu,
		message: 'hyphen as Gedankenstrich, use " – "',
	},
	{ pattern: /\d - \d/g, message: 'spaced range, use "–" without spaces' },
];

// Markup and code in which " - " is not a dash, replaced by spaces so that
// the reported columns stay correct.
const notProse = [
	/<script[\s\S]*?<\/script>/g,
	/<style[\s\S]*?<\/style>/g,
	/^```[\s\S]*?^```/gm,
	/\{\{[\s\S]*?\}\}/g,
	/`[^`\n]*`/g,
	/^\s*- /gm,
];

function blank(text) {
	return notProse.reduce(
		(result, pattern) =>
			result.replace(pattern, match => match.replace(/[^\n]/g, " ")),
		text,
	);
}

function check(file) {
	const source = fs.readFileSync(file, "utf8");
	const rules = file.endsWith(".js") ? everywhere : [...everywhere, ...prose];
	const text = file.endsWith(".js") ? source : blank(source);
	const lines = text.split("\n");

	const errors = [];
	for (const [index, line] of lines.entries()) {
		for (const { pattern, message } of rules) {
			for (const match of line.matchAll(pattern)) {
				const column = match.index + match[0].search(/[-—&]/) + 1;
				errors.push(`${file}:${index + 1}:${column} ${message}`);
			}
		}
	}
	return errors;
}

const files = fs
	.readdirSync(root, { recursive: true })
	.map(entry => path.join(root, entry))
	.filter(file => /\.(md|hbs)$|\.11tydata\.js$/.test(file))
	.sort();

const errors = files.flatMap(check);
for (const error of errors) {
	console.error(error);
}

if (errors.length > 0) {
	process.exit(1);
}

console.log(`${files.length} files checked, no problems found.`);
