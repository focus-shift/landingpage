---
draft: false
layout: layout-blog-article.hbs
date: 2025-06-18
title: Zeiterfassung 2.21.0 – Festschreiben von Zeiteinträgen
author: Tobias Schneider
release-version: 2.21.0
description: Mit Version 2.21.0 können Zeiteinträge für Mitarbeitende festgeschrieben werden.
tags:
  - update
---

Release **2.21.0** bringt das Festschreiben von Zeiteinträgen.

<!-- more -->

## Festschreiben von Zeiteinträgen

Das Hinzufügen und Ändern von Zeiteinträgen kann, seit dem Release 2.21.0, ab einem bestimmten Datum verhindert werden, um sie vor Änderungen zu schützen.
Dies ist besonders wichtig, wenn die Zeitbuchungen für die Lohnabrechnung verwendet werden.

In der Zeiterfassung können Personen mit der Berechtigung "darf die globalen Einstellungen bearbeiten" unter
'Einstellungen > Festschreiben von Zeitslots' einstellen nach wie vielen Tagen Zeiteinträge für die Mitarbeitenden festgeschrieben werden sollen.

    <img
      src="zeiteintrag_festschreiben.png"
      alt="Einstellung zum Festschreiben von Zeiteinträgen mit Anzahl der Tage bis zur Festschreibung"
    />

Nur Mitarbeitende mit der Berechtigung 'darf die Zeiteinträge aller Personen bearbeiten'
können an einem festgeschriebenen Tag neue Zeiteinträge hinzufügen oder bestehende bearbeiten.

Festgeschriebene Tage sind in der Übersicht mit einem Schloss-Symbol markiert.
An diesen Tagen können keine Zeiteinträge hinzugefügt oder geändert werden.

    <img
      src="zeiteintrag_festschreiben_lock_zeit.png"
      alt="Zeiteinträge-Übersicht, in der ein festgeschriebener Tag mit Schloss-Symbol markiert ist"
    />

Für Personen mit der Berechtigung "darf die globalen Einstellungen bearbeiten" wird das Schloss-Symbol angezeigt.
Diese können aber weiterhin neue Zeiteinträge hinzufügen bzw. bearbeiten.

**Warum ist das wichtig?**  
Das Festschreiben von Zeiteinträgen ist eine wichtige Funktion, um die Integrität der Daten zu gewährleisten und sicherzustellen,

## Fazit

**Release 2.21.0** bringt eine wichtige Erweiterung der Zeiterfassung. Das Festschreiben von Zeiteinträgen ist eine wichtige Funktion,
um die Integrität der Daten zu gewährleisten und um sicherzustellen, dass ab einem bestimmten Zeitpunkt keine Änderungen mehr vorgenommen werden können.

<sub>Zur vollständigen Release-Übersicht: [Release 2.21.0 auf GitHub ansehen](https://github.com/urlaubsverwaltung/zeiterfassung/releases/tag/zeiterfassung-2.21.0)</sub>
