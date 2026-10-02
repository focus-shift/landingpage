---
draft: false
layout: layout-blog-article.hbs
date: 2021-12-15
title: Berechtigungskombinationen, Abwesenheitsübersicht und Logback
author: Tobias Schneider
release-version: 4.27.3
description: Urlaubsverwaltung 4.27.3 veröffentlicht. Darin enthalten sind Korrekturen der angezeigten Personen bei Berechtigungskombinationen, eine Korrektur der Abwesenheitsübersicht und ein Update von Logback.
tags:
  - update
---

_Wir beheben Fehler für euch in den Versionen 4.27.1, 4.27.2 und 4.27.3_

<!-- more -->

## Abwesenheitsübersicht

In der Abwesenheitsübersicht hatte sich ein kleiner Fehler eingeschlichen, sodass Feiertage nicht anhand der angezeigten Person,
sondern anhand der globalen Einstellung unter 'Einstellungen zu Feiertagen' angezeigt wurde. Diesen Fehler haben wir für euch
in der Version 4.27.2 behoben und allen Mandaten zur Verfügung gestellt.

## Apache Log4j2 & Logback

Nachdem eine kritische Sicherheitslücke in Apache Log4j2 entdeckt wurde, hält diese die IT-Welt auf Trapp. Es werden nach und nach alle
Systeme identifiziert und Log4j2 aktualisiert.

Die Urlaubsverwaltung setzt diese Bibliothek **nicht** ein und war von dieser Lücke zu keinem Zeitpunkt betroffen.

Jedoch wurde kurz darauf eine deutlich schwächere Sicherheitslücke in dem Logging Framework _Logback_ entdeckt,
welche nur unter ganz bestimmten Voraussetzungen ausgenutzt werden kann. Die Urlaubsverwaltung war auch von dieser
Lücke nicht betroffen. Trotzdem haben wir, um einfach auf Nummer sicher zu gehen, für euch direkt die Urlaubsverwaltung
(4.27.3) mit der neusten Logback Version aktualisiert und allen Mandanten zur Verfügung gestellt.

## Korrektur der angezeigten Personen bei Berechtigungskombinationen

Nachdem die Urlaubsverwaltung, seit der Version 4.26.0, die Kombinationen von Berechtigungen _Office_ bzw. _Chef_ mit
_Abteilungsleiter_ bzw. _Freigabe-Verantwortlicher_ erlaubt, haben wir die Darstellung der _Personenübersicht_
sowie die _Abwesenheitsstatistik_ auf die verschiedenen Kombinationsmöglichkeiten angepasst, sodass du immer genau das siehst,
was du auch sehen darfst.

- Wenn du eine der Berechtigung _Office_ oder _Chef_ hast, werden dir alle Personen der Urlaubsverwaltung angezeigt.
- Wenn du lediglich die Berechtigung _Abteilungsleiter_ bzw. _Freigabe-Verantwortlicher_ hast, werden dir die Personen der Abteilungen angezeigt, in denen du diese Tätigkeit ausübst.
