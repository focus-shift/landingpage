// we can either import Klaro without styles...
import * as Klaro from "klaro/dist/klaro-no-css";
// and the manually load the styles (e.g. to bundle them manually)
// import "static/css/klaro.css";
// or we can import Klaro with styles:
// import * as Klaro from "klaro"

// we define a minimal configuration
const config = {
	version: 1,
	acceptAll: true,
	cookieName: "klaro",
	cookieExpiresAfterDays: 365,
	hideDeclineAll: true,
	noticeIsModal: true,
	// renders the notice title, which names the notice dialog via aria-labelledby
	showNoticeTitle: true,
	translations: {
		de: {
			consentModal: {
				title: "🍪 Lass uns besser kennenlernen!",
				description:
					"Unsere Cookies helfen uns, deine Vorlieben zu verstehen, Inhalte zu personalisieren und unser Angebot zu verbessern." +
					" Mit einem Klick auf „Akzeptieren“ gestalten wir gemeinsam ein Erlebnis, das zu dir passt.",
			},
			consentNotice: {
				title: "Cookie-Einstellungen",
				description:
					" Hallo! Aktiviere zusätzliche Dienste für {purposes}! Du kannst die Einstellungen jederzeit ändern.",
				learnMore: "Auswählen",
			},
			purposes: {
				scheduling: {
					title: "Terminbuchung",
					description:
						"Diese Dienste ermöglichen es dir, direkt einen Termin mit uns zu vereinbaren.",
				},
			},
			"cal-com": {
				title: "cal.com",
				description:
					"Kalender zur Terminbuchung. Beim Laden werden Daten an cal.com übertragen und Cookies von cal.com gesetzt.",
			},
		},
	},
	services: [
		{
			name: "google-tag-manager",
			required: true,
			purposes: ["marketing"],
			onAccept: `
									// we notify the tag manager about all services that were accepted. You can define
									// a custom event in GTM to load the service if consent was given.
									for(let k of Object.keys(opts.consents)){
											if (opts.consents[k]){
													let eventName = 'klaro-'+k+'-accepted';
													dataLayer.push({'event': eventName});
											}
									}
							`,
			onInit: `
									// initialization code here (will be executed only once per page-load)
									window.dataLayer = window.dataLayer || [];
									window.gtag = function(){dataLayer.push(arguments)};
									gtag('consent', 'default', {'ad_storage': 'denied', 'analytics_storage': 'denied', 'ad_user_data': 'denied', 'ad_personalization': 'denied'});
									gtag('set', 'ads_data_redaction', true);
							`,
		},
		{
			// In GTM, you should define a custom event trigger named `klaro-google-analytics-accepted` which should trigger the Google Analytics integration.
			name: "google-analytics",
			cookies: [
				/^_ga(_.*)?/, // we delete the Google Analytics cookies if the user declines its use
			],
			purposes: ["marketing"],
			onAccept: `
									// we grant analytics storage
									gtag('consent', 'update', {
											'analytics_storage': 'granted',
									})
							`,
			onDecline: `
									// we deny analytics storage
									gtag('consent', 'update', {
											'analytics_storage': 'denied',
									})
							`,
		},
		{
			name: "google-ads",
			cookies: [],
			onAccept: `
									// we grant ad storage and personalization
									gtag('consent', 'update', {
											'ad_storage': 'granted',
											'ad_user_data': 'granted',
											'ad_personalization': 'granted'
									})
							`,
			onDecline: `
									// we decline ad storage and personalization
									gtag('consent', 'update', {
											'ad_storage': 'denied',
											'ad_user_data': 'denied',
											'ad_personalization': 'denied'
									})
							`,
			purposes: ["marketing"],
		},
		{
			// the inline calendar script in section-meeting.hbs is executed by klaro after consent.
			// the cookies are set on cal.com and therefore cannot be deleted by klaro.
			name: "cal-com",
			cookies: [],
			purposes: ["scheduling"],
			// remove the calendar when the consent is withdrawn, e.g. via the cookie settings in the footer.
			// the script renders the calendar again on the next consent.
			onDecline: `
									const meetingCalendar = document.getElementById("meeting-calendar");
									if (meetingCalendar) {
											meetingCalendar.replaceChildren();
											delete meetingCalendar.dataset.calRendered;
									}
							`,
		},
	],
};

// we assign the Klaro module to the window, so that we can access it in JS
window.klaro = Klaro;
window.klaroConfig = config;
// we set up Klaro with the config
Klaro.setup(config);

// buttons in placeholders load a single service, e.g. the cal.com calendar.
// same behaviour as the contextual consent notice of klaro: the consent is only saved
// if the visitor already made a decision in the cookie notice, otherwise it applies to this page only.
// e.g. the link in the footer, so visitors can change or withdraw their consent at any time
document.addEventListener("click", event => {
	if (event.target.closest("[data-klaro-show]")) {
		Klaro.show(config, true);
	}
});

document.addEventListener("click", event => {
	const button = event.target.closest("[data-klaro-accept]");
	if (!button) {
		return;
	}
	const serviceName = button.dataset.klaroAccept;
	const manager = Klaro.getManager(config);
	manager.updateConsent(serviceName, true);
	if (manager.confirmed) {
		manager.saveConsents("contextual-accept");
	}
	manager.applyConsents(false, true, serviceName);
});
