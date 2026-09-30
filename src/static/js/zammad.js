// note: scripts are injected dynamically instead of <script defer>.
//       deferred scripts delay DOMContentLoaded and therefore the browser scrolling to the #anchor.
//       the (slow) external chat script would render the page at the top first and jump to the #anchor afterwards.
function loadScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.addEventListener("load", resolve);
		script.addEventListener("error", reject);
		document.head.append(script);
	});
}

loadScript("/static/js/jquery.min.js")
	.then(() =>
		loadScript(
			"https://support.apps.urlaubsverwaltung.cloud/assets/chat/chat.min.js",
		),
	)
	.then(() => {
		// eslint-disable-next-line no-undef
		new ZammadChat({
			host: "wss://support.apps.urlaubsverwaltung.cloud/ws",
			title: "Hast du eine Frage?",
			background: "rgb(49, 130, 206)",
			fontSize: "12px",
			chatId: 1,
			flat: true,
		});
	});
