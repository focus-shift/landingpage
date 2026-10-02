import "./components/easteregg";
import "./components/goals";
import "./components/page-prerenderer";
import "./components/price-calculator.js";
import "./components/carousel.js";

// the browser jumps to the #anchor before lazy images, fonts etc. are loaded.
// the layout above the target then still shifts, so jump again once everything is loaded.
window.addEventListener("load", function () {
	if (location.hash.length > 1) {
		document
			.getElementById(decodeURIComponent(location.hash.slice(1)))
			?.scrollIntoView({ behavior: "instant" });
	}
});
