// average reading speed of german texts
const wordsPerMinute = 200;

/**
 * Estimates the reading time of the given html content. Tags are stripped, so
 * only the visible text is counted. Always returns at least one minute.
 *
 * @param html rendered html content
 * @return {number} reading time in minutes
 */
export function readingTimeMinutes(html) {
	const text = String(html ?? "")
		.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
		.replace(/<[^>]+>/g, " ");
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / wordsPerMinute));
}
