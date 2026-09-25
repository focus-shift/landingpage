// clicking a (partially visible) carousel item scrolls it into the center.
// navigation for browsers without CSS scroll marker support.
document.addEventListener("DOMContentLoaded", function () {
	const supportsScrollMarkers = CSS.supports("scroll-marker-group: after");

	for (const carousel of document.querySelectorAll(".carousel")) {
		const items = [...carousel.children];

		function scrollToItem(item) {
			// container: "nearest" prevents scrolling the page, when supported
			item.scrollIntoView({
				inline: "center",
				block: "nearest",
				container: "nearest",
			});
		}

		carousel.addEventListener("click", function (event) {
			const item = items.find(child => child.contains(event.target));
			if (item) {
				scrollToItem(item);
			}
		});

		// browser generates buttons itself with ::scroll-marker (see demo.css)
		const buttons = supportsScrollMarkers
			? []
			: createButtons(carousel, items, scrollToItem);

		// centered item is not clickable, others are
		const observer = new IntersectionObserver(
			function (entries) {
				for (const entry of entries) {
					entry.target.classList.toggle(
						"cursor-pointer",
						!entry.isIntersecting,
					);
					buttons[items.indexOf(entry.target)]?.setAttribute(
						"aria-current",
						entry.isIntersecting,
					);
				}
			},
			{ root: carousel, threshold: 0.5 },
		);
		for (const item of items) {
			observer.observe(item);
		}
	}
});

function createButtons(carousel, items, scrollToItem) {
	const list = document.createElement("ul");
	list.className = "mt-4 col-span-full flex justify-center gap-1";

	const buttons = items.map(function (item, index) {
		const button = document.createElement("button");
		button.type = "button";
		button.textContent = index + 1;
		button.setAttribute("aria-label", `Bild ${index + 1}`);
		button.className =
			"flex items-center justify-center w-8 h-8 rounded-full border border-lila cursor-pointer aria-[current=true]:bg-lila";
		button.addEventListener("click", () => scrollToItem(item));

		const listItem = document.createElement("li");
		listItem.append(button);
		list.append(listItem);
		return button;
	});

	carousel.after(list);
	return buttons;
}
