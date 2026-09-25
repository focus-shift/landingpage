---
redirect_from: /hilfe/sso/google/
title: Google Workspace - Single Sign-On (SSO) - Hilfe
description: Single Sign-On (SSO) mit Google Workspace (Cloud Identity) für urlaubsverwaltung.cloud
eleventyNavigation:
  key: google-workspace
  title: Google Workspace
  parent: sso
---

# Single Sign-On mit Google Workspace (Cloud Identity)

## Welcher Benutzer darf die Google Workspace Anbindung konfigurieren?

Die Konfiguration kann nur von dem Benutzer durchgeführt werden, welcher die Registrierung zu
urlaubsverwaltung.cloud durchgeführt hat. Dieser Benutzer hat die Berechtigung auf _Mein Kundenportal_, über
welches die Konfiguration durchgeführt werden kann.

Zu _Mein Kundenportal_ gelangst du über _[urlaubsverwaltung.cloud](https://urlaubsverwaltung.cloud)_ > _Login_ und nach erfolgreichem Login über die Kachel _Mein Kundenportal_.

## Welche Daten eines Benutzers aus Google Workspace werden verwendet?

Bei der Anbindung von Google Workspace erhalten wir über den _ID Token_ Zugriff auf folgende Attribute:

- _email_: Die E-Mail-Adresse des Benutzers
- _family_name_: Der Nachname des Benutzers
- _given_name_: Der Vorname des Benutzers

## Welche API Berechtigungen von Google werden verwendet?

Durch die Ansprüche im _ID Token_ benötigt die registrierte Anwendung im OAuth-Zustimmungsbildschirm folgende Berechtigungen auf die Google\_-API:

- _.../auth/userinfo.email_
- _.../auth/userinfo.profile_
- _openid_

## Wie kann ich die Google Workspace Anbindung konfigurieren?

Dazu sind folgende Schritte notwendig:

- [Schritt 1: Neue Anwendung in Google Cloud registrieren](#schritt-1-neue-anwendung-in-google-cloud-registrieren)
- [Schritt 2: Auf Mein Kundenportal die Anbindung konfigurieren](#schritt-2-auf-mein-kundenportal-die-anbindung-konfigurieren)
- [Schritt 3: Für die Anwendung eine Weiterleitungs-URI konfigurieren](#schritt-3-fuer-die-anwendung-eine-weiterleitungs-uri-konfigurieren)
- [Schritt 4: Anmelden via Google Workspace](#schritt-4-anmeldung-via-google-workspace)

### Schritt 1: Neue Anwendung in Google Cloud registrieren

Zunächst musst du dich im [Google Cloud Console](https://console.cloud.google.com/) mit deinem Google-Konto anmelden.
Danach erstellst du am Besten ein neues Google Cloud Projekt.

Nun auf die Seite [OAuth-Zustimmungsbildschirm](https://console.cloud.google.com/apis/credentials/consent) wechseln und dort eine neue Anwendung anlegen.

1. Unter Anwendungsinformation bei _Anwendungsname_ z. B. _urlaubsverwaltung.cloud_ verwenden
2. Unter Anwendungsdomain / Autorisierte Domains bei _Autorisierte Domains_ die Domain deiner E-Mail hinzufügen
3. Via _Bereich Hinzufügen_ folgende Bereiche hinzufügen:
   - _.../auth/userinfo.email_
   - _.../auth/userinfo.profile_
   - _openid_

Nun auf die Seite [Anmeldedaten](https://console.cloud.google.com/apis/credentials) wechseln und dort neue Anmeldedaten
vom Typ OAuth-Client-ID erstellen.

1. Als Anwendungstyp _Webanwendung_ auswählen
2. Als _Name_ kann z.B. _urlaubsverwaltung-cloud_ verwedet werden
3. Mit ERSTELLEN die Anmeldedaten erstellen

Aus dem Popup die Werte von _Client-ID_ und _Clientschlüssel_ in eine Textdatei kopieren, welche wir später benötigen.

### Schritt 2: Auf Mein Kundenportal die Anbindung konfigurieren

Dazu muss man nun zu _Mein Kundenportal_ von [urlaubsverwaltung.cloud](https://urlaubsverwaltung.cloud) via _Login_ und über die Kachel
_Mein Kundenportal_ wechseln. Unter _Single-Sign-On_ > _Google Workspace_ gelangst du nun auf die Konfigurationsseite.

Zuerst kopierst du die hervorgehobene URI in die Textdatei, welche in [Schritt 3](#schritt-3-fuer-die-anwendung-eine-weiterleitungs-uri-konfigurieren) als Weiterleitungs-URI konfiguriert wird.

Nun brauchen wir die Werte aus der Textdatei von [Schritt 1](#schritt-1-neue-anwendung-in-google-cloud-registrieren):

1. Wert von _Client-ID_
2. Wert von _Clientschlüssel_
3. Ein Klick auf _speichern_ konfiguriert nun die Anbindung von urlaubsverwaltung.cloud zu Google Workspace.

### Schritt 3: Für die Anwendung eine Weiterleitungs-URI konfigurieren

Nun auf die Seite [Anmeldedaten](https://console.cloud.google.com/apis/credentials) wechseln und dort unter OAuth 2.0-Client-IDs
den Eintrag _urlaubsverwaltung-cloud_ anklicken:

1. Die Weiterleitungs-URI aus der Textdatei als _Autorisierte Weiterleitungs-URI_ hinzufügen
2. _Speichern_ klicken

Nun ist die Konfiguration auf bei Google abgeschlossen.

### Schritt 4: Anmeldung via Google Workspace

<aside class="wissensbasis-info">
  <p class="font-bold uppercase">Achtung</p>
  <p>
    Ab jetzt bitte alles in einem neuen privaten Browserfenster durchführen.
  </p>
</aside>

Nachdem die Konfiguration von Schritt 1 bis 3 erfolgreich durchgeführt wurde, kann nun die Anmeldung zu
urlaubsverwaltung.cloud via Google Workspace erfolgen.
Dazu öffnest du _[urlaubsverwaltung.cloud](https://urlaubsverwaltung.cloud)_ > _Login_, gibst deine E-Mail ein, klickst auf _Weiter_.
Nun wirst du zur Anmelde-Seite von Google umgeleitet und musst dich mit deinem Google Konto anmelden.

Danach wirst du auf den Authentifizierungsserver von urlaubsverwaltung.cloud weitergeleitet. Dieser merkt,
dass es zu deiner E-Mail-Adresse schon ein Konto gibt.

1. Durch einen Klick auf _Zu einem bestehenden Benutzerkonto hinzufügen_ weist du den
   Authentifizierungsserver von urlaubsverwaltung.cloud an, dass du das Google Workspace Konto mit dem
   urlaubsverwaltung.cloud Konto verknüpfen möchtest.

Der Authentifizierungsserver von urlaubsverwaltung.cloud schickt dir nun eine E-Mail mit einem Link, um
sicher zu stellen, dass die Verknüpfung der Benutzerkonten auch wirklich von dir angefordert wurde und du im
Besitz beider Benutzerkonten bist.

1. Nach einem Klick auf _Link zur Bestätigung der Kontoverknüpfung_ gelangst du nun in das Portal von urlaubsverwaltung.cloud

Nun hast du erfolgreich die Integration von Google Workspace und urlaubsverwaltung.cloud durchgeführt.

Die Verknüpfung des Kontos von urlaubsverwaltung.cloud und Google Workspace erfolgt nur für deinen Benutzer bzw.
für Benutzer, welche _vor_ der Integration mit Google Workspace Zugriff auf urlaubsverwaltung.cloud haben.
Für neue Benutzer ist dies _nicht_ erforderlich und sie können direkt auf die Urlaubsverwaltung zugreifen.
