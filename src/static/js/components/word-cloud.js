// randomizes the deterministic css positions of the word cloud (see software.css).
// words are distributed randomly into rows, then randomly spread within their row.
// positions are fractions of the free space, so the layout survives resizing
// as long as the number of rows does not change.
//
// no DOMContentLoaded listener: the script is loaded as module (deferred), so the
// document is parsed already. a listener would never fire when the script runs
// after DOMContentLoaded (e.g. injected by the eleventy dev server live reload).
for (const cloud of document.querySelectorAll(".word-cloud")) {
	if (!cloud.firstElementChild) {
		continue;
	}

	let rows = 0;

	function layout() {
		const nextRows = Number(getComputedStyle(cloud).getPropertyValue("--rows"));
		if (nextRows === rows) {
			return;
		}
		rows = nextRows;
		randomize(cloud, rows);
	}

	// measure words with the real font, otherwise widths are wrong.
	// only wait for the font of the words (preloaded), document.fonts.ready waits
	// for all fonts of the page and resolves quite late in safari.
	// don't wait forever on slow connections, the words are invisible meanwhile.
	const { fontSize, fontFamily } = getComputedStyle(cloud.firstElementChild);
	Promise.race([
		document.fonts.load(`${fontSize} ${fontFamily}`),
		new Promise(resolve => setTimeout(resolve, 300)),
	]).then(start, start);

	function start() {
		try {
			layout();
			// number of rows changes at breakpoints
			new ResizeObserver(layout).observe(cloud);
		} finally {
			// start the animation (paused by css until the words are positioned).
			// in finally, otherwise the words stay invisible on errors.
			cloud.dataset.ready = "";
		}
	}
}

function randomize(cloud, rowCount) {
	const width = cloud.clientWidth;
	const height = cloud.clientHeight;
	const words = [...cloud.children].map(element => ({
		element,
		width: element.offsetWidth,
		height: element.offsetHeight,
	}));
	// minimal gap between two words of the same row
	const gap = width * 0.03;

	const rows = distribute(words, rowCount, width, gap);
	if (!rows) {
		// keep css positions
		return;
	}

	const rowHeight = height / rowCount;
	// the animation order must not change once the animation has been started,
	// otherwise words jump back to invisible (e.g. on resize or late font loading)
	const started = words.some(word =>
		word.element.getAnimations().some(animation => animation.currentTime > 0),
	);
	const delays = started ? undefined : shuffle(words.map((_, index) => index));

	for (const [rowIndex, row] of shuffle(rows).entries()) {
		const used = row.reduce((sum, word) => sum + word.width, 0);
		const free = width - used - gap * (row.length - 1);
		// random split of the free space into gaps before, between and after the words
		const weights = Array.from({ length: row.length + 1 }, () => Math.random());
		const weightSum = weights.reduce((sum, weight) => sum + weight, 0);

		let left = 0;
		for (const [index, word] of row.entries()) {
			left += (free * weights[index]) / weightSum;
			const top =
				rowIndex * rowHeight + Math.random() * (rowHeight - word.height);

			const { style } = word.element;
			style.setProperty("--x", fraction(left, width - word.width));
			style.setProperty("--y", fraction(top, height - word.height));
			if (delays) {
				style.setProperty("--i", delays[words.indexOf(word)]);
			}

			left += word.width + gap;
		}
	}
}

// random assignment of words to rows, so that every row is used and no row overflows.
// returns undefined when no fitting assignment has been found.
function distribute(words, rowCount, width, gap) {
	for (let attempt = 0; attempt < 100; attempt++) {
		const rows = Array.from({ length: rowCount }, () => []);
		const used = Array.from({ length: rowCount }, () => 0);
		let fits = true;

		for (const [index, word] of shuffle(words).entries()) {
			const remainingWords = words.length - index;
			const emptyRows = rows.filter(row => row.length === 0).length;
			const candidates = rows
				.map((row, rowIndex) => rowIndex)
				.filter(rowIndex => {
					const needed =
						used[rowIndex] + (rows[rowIndex].length > 0 ? gap : 0) + word.width;
					// keep enough words for the remaining empty rows
					const blocksEmptyRow =
						rows[rowIndex].length > 0 && remainingWords <= emptyRows;
					return needed <= width && !blocksEmptyRow;
				});

			if (candidates.length === 0) {
				fits = false;
				break;
			}

			const rowIndex =
				candidates[Math.floor(Math.random() * candidates.length)];
			used[rowIndex] += (rows[rowIndex].length > 0 ? gap : 0) + word.width;
			rows[rowIndex].push(word);
		}

		if (fits) {
			return rows;
		}
	}
}

function fraction(value, total) {
	return total > 0 ? Math.min(1, Math.max(0, value / total)) : 0;
}

function shuffle(array) {
	const copy = [...array];
	for (let index = copy.length - 1; index > 0; index--) {
		const other = Math.floor(Math.random() * (index + 1));
		[copy[index], copy[other]] = [copy[other], copy[index]];
	}
	return copy;
}
