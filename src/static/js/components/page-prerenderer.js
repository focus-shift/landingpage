if (window.location.pathname !== "/") {
	const indexPrerender = createPrerenderLink("/");
	document.head.append(indexPrerender);
}

new IntersectionObserver(function handleFooterIntersection(entries, observer) {
	setTimeout(function () {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				observer.disconnect();
				setTimeout(() => {
					const linkElements = [...entry.target.querySelectorAll("a")];
					const prerenderElements = linkElements
						.filter(
							link =>
								link.href !== window.location.href &&
								link.origin === window.location.origin,
						)
						.map(link => createPrerenderLink(link.href));
					document.head.append(...prerenderElements);
				});
			}
		});
	});
}).observe(document.querySelector("footer"));

document.addEventListener("mouseover", function (event) {
	if (event.target.matches("a[href]")) {
		const target = event.target.getAttribute("href");
		if (
			!target ||
			target.startsWith("#") ||
			target.startsWith("http") ||
			target.startsWith("mailto:") ||
			target.startsWith("tel:")
		) {
			return;
		}
		if (document.querySelector(`link[rel="preload"][href="${target}"]`)) {
			return;
		}
		const link = document.createElement("link");
		link.rel = "preload";
		link.href = target;
		document.head.appendChild(link);
		console.log("preloaded", link);
	}
});

function createPrerenderLink(href) {
	const prerender = document.createElement("link");
	prerender.rel = "prerender";
	prerender.href = href;
	return prerender;
}
