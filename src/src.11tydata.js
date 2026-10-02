const demo =
	"https://urlaubsverwaltung.demo.urlaubsverwaltung.cloud/oauth2/authorization/oidc";

export default {
	links: {
		login: "https://registry.apps.urlaubsverwaltung.cloud/login/redirect",
		registration: "https://registry.apps.urlaubsverwaltung.cloud/registration",

		demo: {
			office: `${demo}?login_hint=office`,
			boss: `${demo}?login_hint=boss`,
			user: `${demo}?login_hint=user`,
		},

		github: "https://github.com/urlaubsverwaltung",
		linkedIn: "https://www.linkedin.com/company/focus-shift-software",

		individualPriceRequest:
			"mailto:support@focus-shift.de?subject=Anfrage%20individuelles%20Angebot",
		onPremiseSupportRequest:
			"mailto:support@focus-shift.de?subject=Anfrage%20On%20Premise%20Support",
		onPremiseInstallationRequest:
			"mailto:support@focus-shift.de?subject=Anfrage%20On%20Premise%20Installation",

		googlePlayStore:
			"https://play.google.com/store/apps/details?id=cloud.urlaubsverwaltung.mobile.urlaubsverwaltung",
		appleAppStore:
			"https://apps.apple.com/de/app/urlaubsverwaltung-cloud/id6747396834",
	},
};
