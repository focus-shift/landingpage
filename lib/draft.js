/**
 * A page counts as draft when `draft` is set without a value (`draft:` in the
 * frontmatter) or when it is set to something truthy.
 *
 * @param draft raw `draft` frontmatter value
 * @return {boolean}
 */
export function isDraft(draft) {
	return draft === "" ? true : Boolean(draft);
}

/**
 * Articles have to opt into being published by declaring `draft: false`. A
 * missing `draft` counts as draft on purpose, so that forgetting the attribute
 * can never publish an article by accident.
 *
 * @param draft raw `draft` frontmatter value
 * @return {boolean}
 */
export function isDraftArticle(draft) {
	return draft === undefined || isDraft(draft);
}
