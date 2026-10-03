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

// the chat can be dismissed by the user. the bear then only peeks around the left corner of the
// page, also on later visits, until it is clicked and the chat appears again.
const DISMISSED_KEY = "zammad-chat-dismissed";
const PEEKING_CLASS = "zammad-chat--peeking";

function isChatDismissed() {
	try {
		return localStorage.getItem(DISMISSED_KEY) === "true";
	} catch {
		return false;
	}
}

function setChatDismissed(chatElement, dismissed) {
	chatElement.classList.toggle(PEEKING_CLASS, dismissed);
	try {
		if (dismissed) {
			localStorage.setItem(DISMISSED_KEY, "true");
		} else {
			localStorage.removeItem(DISMISSED_KEY);
		}
	} catch {
		// storage not available, the chat is only dismissed on the current page
	}
}

function addDismissButton() {
	const chatElement = document.querySelector(".zammad-chat");
	const welcome = chatElement?.querySelector(".zammad-chat-welcome");
	if (!welcome || welcome.querySelector(".zammad-chat-dismiss")) {
		return;
	}

	const button = document.createElement("button");
	button.type = "button";
	button.className = "zammad-chat-dismiss";
	button.textContent = "Nein, danke.";
	button.addEventListener("click", event => {
		// do not open the chat via the click handler of the header
		event.stopPropagation();
		setChatDismissed(chatElement, true);
	});
	welcome.append(button);

	// a click on the peeking bear brings the chat back instead of opening it.
	// captured before it reaches the click handler of the header.
	chatElement.addEventListener(
		"click",
		event => {
			if (chatElement.classList.contains(PEEKING_CLASS)) {
				event.stopPropagation();
				setChatDismissed(chatElement, false);
			}
		},
		{ capture: true },
	);

	chatElement.classList.toggle(PEEKING_CLASS, isChatDismissed());
}

// the collapsed chat is stacked on top of the cookie notice while it is shown.
// klaro removes the notice from the DOM as soon as the user has decided.
let isStackingChat = false;

function stackChatAboveCookieNotice() {
	const klaro = document.getElementById("klaro");
	if (!klaro || isStackingChat) {
		return;
	}
	isStackingChat = true;

	let observedNotice;
	const resizeObserver = new ResizeObserver(() => update());

	function update() {
		const notice = klaro.querySelector(
			".cookie-notice:not(.cookie-modal-notice)",
		);
		if (notice !== observedNotice) {
			if (observedNotice) {
				resizeObserver.unobserve(observedNotice);
			}
			if (notice) {
				resizeObserver.observe(notice);
			}
			observedNotice = notice;
		}

		const offset = notice
			? Math.max(window.innerHeight - notice.getBoundingClientRect().top, 0)
			: 0;
		document.documentElement.style.setProperty(
			"--cookie-notice-offset",
			`${offset}px`,
		);
	}

	new MutationObserver(update).observe(klaro, {
		childList: true,
		subtree: true,
	});
	window.addEventListener("resize", update);
	update();
}

// the chat is not needed for the first paint. loading it after the page has loaded keeps
// jquery and the chat script (with its css) from competing with the hero image and fonts.
function afterPageLoad() {
	return new Promise(resolve => {
		if (document.readyState === "complete") {
			resolve();
		} else {
			window.addEventListener("load", () => resolve(), { once: true });
		}
	});
}

afterPageLoad()
	.then(() => loadScript("/static/js/jquery.min.js"))
	.then(() =>
		loadScript(
			"https://support.apps.urlaubsverwaltung.cloud/assets/chat/chat.min.js",
		),
	)
	.then(() => {
		// eslint-disable-next-line no-undef
		new ZammadChat({
			host: "wss://support.apps.urlaubsverwaltung.cloud/ws",
			title: "Kann ich dir helfen?",
			// header, send button and messages of the visitor
			background: "var(--color-lila-dark)",
			fontSize: "12px",
			chatId: 1,
			flat: true,
			onReady: () => {
				addDismissButton();
				stackChatAboveCookieNotice();
			},
		});
	});
