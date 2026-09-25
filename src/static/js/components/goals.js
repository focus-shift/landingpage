window.addEventListener("click", function (event) {
	if (typeof plausible === "function") {
		const link =
			event.target.tagName === "A" ? event.target : event.target.closest("a");
		if (!link) {
			return;
		}
		const { goal, goalTrigger } = link.dataset;
		if (goal) {
			// eslint-disable-next-line no-undef
			plausible(goal, { props: { trigger: goalTrigger } });
			if (!(event.ctrlKey || event.metaKey || event.shiftKey)) {
				setTimeout(function () {
					location.href = link.href;
				}, 100);
				event.preventDefault();
			}
		}
	}
});

(function () {
	let utmParameter = [
		"utm_medium",
		"utm_source",
		"utm_campaign",
		"utm_term",
		"utm_content",
	];

	let availableUrlSearchParams = new URLSearchParams(document.location.search);
	for (let utmParam of utmParameter) {
		addUrlParamToSessionStorage(availableUrlSearchParams, utmParam);
	}

	let availableSessionUtmElements = utmParameter
		.map(param => {
			const value = sessionStorage.getItem(param);
			return value ? [param, value] : "";
		})
		.filter(Boolean);

	if (availableSessionUtmElements.length > 0) {
		// we have to use values from sessionStorage instead of the current URL
		// since the user could have navigated to another page which doesn't have these search params in the url
		for (let utmAnchor of document.querySelectorAll("a[data-append-utm]")) {
			let url = new URL(utmAnchor.href);
			for (let [param, value] of availableSessionUtmElements) {
				url.searchParams.set(param, value);
			}
			utmAnchor.href = url.toString();
		}
	}

	function addUrlParamToSessionStorage(urlParams, urlParamName) {
		let paramValue = urlParams.get(urlParamName);
		if (paramValue !== null) {
			sessionStorage.setItem(urlParamName, paramValue);
		}
	}
})();
