import { isDraft, isDraftArticle } from "../../lib/draft.js";

const prod = process.env.NODE_ENV === "production";

/**
 * @typedef {("blog"|"update")} ArticleCategory
 */

/**
 * Note on computed data: a computed value may only reference the frontmatter
 * key of the same name when it is a pure override (e.g. `permalink` below).
 * Deriving a key from itself is not safe, since Eleventy resolves the
 * reference to "" for pages that do not define the key at all - a computed
 * `draft: data => data.draft === "" ? true : ...` would therefore mark every
 * page without an explicit `draft` as a draft. Hence `isDraft` reads `draft`.
 */
export default {
	eleventyComputed: {
		isDraft: isDraftPage,
		teaserImage: data => {
			if (!isArticle(data)) {
				return;
			}

			const category = getCategory(data);
			if (category === "update") {
				if (data.teaserImage) {
					console.warn(
						`[WARN] overriding teaser image of blog article category=update path=${data.page.inputPath}`,
					);
				}
				return {
					src: "/static/img/blog-update-teaser.png",
					alt: "",
					class: "p-8 w-full h-full object-contain",
				};
			}

			if (data.teaserImage) {
				if (typeof data.teaserImage === "string") {
					let src;
					if (data.teaserImage.startsWith("/")) {
						// absolute image url
						src = data.teaserImage;
					} else {
						// relative teaser image, file is in article directory
						src = data.page.url + data.teaserImage;
					}
					return {
						src,
						alt: "",
						class: "w-full h-full object-cover object-[center_30%]",
					};
				}
				if (!data.teaserImage.src || typeof data.teaserImage.alt !== "string") {
					throw new Error("expected teaser image to define 'src' and 'alt'");
				}
				return data.teaserImage;
			}

			// throw new Error(`blog category=${category} requires a teaser image`);
			console.error(
				`[WARN] article requires a teaser image category=${category}`,
				data.page.inputPath,
			);
		},
		navigation: {
			activeItem: "neuigkeiten",
		},
		category: data => {
			return isArticle(data) ? getCategory(data) : undefined;
		},
		permalink: data => {
			if (isDraftPage(data) && prod) {
				// ignore permalink for drafts on production mode
				// -> no html file will be generated
				return false;
			}
			return data.permalink;
		},
	},
};

/**
 * Every article has to opt into being published by declaring `draft: false`.
 * A missing `draft` is treated as a draft on purpose, so that forgetting the
 * attribute can never publish an article by accident.
 *
 * Listing pages (neuigkeiten, blog, update) are not articles and are always
 * published.
 *
 * @param data eleventy data for current element
 * @return {boolean}
 */
function isDraftPage(data) {
	if (!isArticle(data)) {
		return isDraft(data.draft);
	}
	if (data.draft === undefined) {
		console.error(
			"[ERROR] article has no 'draft' attribute and is therefore treated as a draft. add 'draft: false' to publish it.",
			data.page.inputPath,
		);
	}
	return isDraftArticle(data.draft);
}

/**
 * Articles are markdown files, listing pages are handlebars templates.
 *
 * @param data eleventy data for current element
 * @return {boolean}
 */
function isArticle(data) {
	return Boolean(data.page?.inputPath?.endsWith(".md"));
}

/**
 * @param data eleventy data for current element
 * @return {ArticleCategory}
 */
function getCategory(data) {
	if (
		data.category === "update" ||
		data.page?.inputPath.endsWith("-release/index.md") ||
		data.page?.inputPath.includes("-release-")
	) {
		return "update";
	}
	return data.category || "blog";
}
