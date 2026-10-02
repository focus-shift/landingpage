---
draft: false
layout: layout-blog-article.hbs
date: 2025-05-16
title: Zeiterfassung 2.17.0 – Verbesserte Sortierung & privilegierte Benutzerfunktionen
author: Andreas Weigel
release-version: 2.17.0
description: Release 2.17.0 bietet neue Funktionen zur Sortierung von Personen und Zeiteinträgen sowie Verbesserungen bei der Zeiterfassung für privilegierte Benutzer. Zudem wurde ein Bug behoben, bei dem bearbeitete Zeitslots nicht mehr hervorgehoben wurden.
tags:
  - update
---

Das **Release 2.17.0** bringt wichtige Erweiterungen zur **Zeiterfassung und Benutzerverwaltung**. Neue Funktionen für die **Sortierung von Personen und Zeiteinträgen** sowie **verbesserte Rechte für privilegierte Nutzer** machen die Anwendung noch benutzerfreundlicher und leistungsfähiger. Zudem wurde ein Fehler behoben, der die Anzeige von bearbeiteten Zeitslots betraf.

<!-- more -->

## Verbesserungen

### Sortierung von Personen (z.B. auf der Personen-Seite)

Ab sofort werden die **Personen auf der Personen-Seite** anhand des Vornamen und dann des Nachnamen sortiert.

### Sortierung von Zeiteinträgen anhand der Startzeit

Zeiteinträge werden nun nach der **Startzeit** anstatt der **Erfassungszeit** sortiert.
Diese neue Sortierungsoption erleichtert es, die Zeiteinträge nach ihrer tatsächlichen **Arbeitszeit** und nicht nach dem Zeitpunkt der Erfassung zu ordnen.

### Zeiteintrag bei Berichten bearbeiten können als privilegierte Person

Jetzt können **privilegierte Personen**, wie Vorgesetzte oder Administratoren, **Zeiteinträge bei Berichten bearbeiten**.
Dies ermöglicht eine einfache Korrektur von fehlerhaften oder ungenauen Zeiteinträgen, ohne dass die betroffenen Mitarbeiter:innen die Änderung vornehmen müssen.

### Zeiterfassung für Mitarbeitende als privilegierte Benutzende

Als **privilegierte Benutzende** Person, kann ich nun **Zeiteinträge** für andere Personen anlegen und löschen.
Dies ist besonders nützlich für **Vorgesetzte** oder **HR-Mitarbeitende**, die die Zeiterfassung für ihre Teammitglieder verwalten müssen.

**Warum ist das wichtig?**

- Für **Verwaltungsaufgaben** und **HR-Management** in größeren Organisationen ist es entscheidend, eine gut strukturierte und durchsuchbare Liste von Personen zu haben. Diese Funktion ermöglicht eine schnelle Navigation und eine bessere Übersicht.
- Die **Startzeit** ist oft relevanter für die **Projekt- und Arbeitszeiterfassung** als die Zeit der Erfassung. Diese Änderung hilft dabei, einen genaueren Überblick über den Verlauf des Arbeitstages und die geleisteten Stunden zu erhalten.
- Für **HR-Abteilungen** und **Vorgesetzte** ist es wichtig, die **Berichte zu überprüfen** und gegebenenfalls Anpassungen vorzunehmen. Diese Funktion ermöglicht es, Zeiteinträge zentral zu korrigieren und die Genauigkeit der Daten sicherzustellen.

## Fehlerbehebungen

### Bearbeiteter, noch nicht gespeicherter Zeitslot wurden nicht mehr hervorgehoben

Ein Fehler, bei dem **bearbeitete, aber noch nicht gespeicherte Zeitslots** nicht mehr hervorgehoben wurden, wurde behoben.
Zuvor war es schwierig, Änderungen an Zeitslots zu erkennen, bevor sie gespeichert wurden. Dieser Bugfix sorgt dafür,
dass bearbeitete Zeitslots weiterhin visuell hervorgehoben bleiben.

**Warum ist das wichtig?**  
Die visuelle Hervorhebung von **unterschiedlichen Zeitslots** ist wichtig, damit Nutzer erkennen können, welche Einträge geändert wurden. So wird der **Bearbeitungsstatus** klar und ermöglicht eine effizientere Verwaltung der Zeiterfassung.

## Fazit

**Release 2.17.0** bringt eine Reihe von Verbesserungen in der **Zeiterfassungssoftware**, die die Benutzerfreundlichkeit und Verwaltung von Arbeitszeiten weiter verbessern. Mit den neuen Funktionen zur **Sortierung von Personen und Zeiteinträgen** sowie den erweiterten Rechten für **privilegierte Benutzer** wird die Anwendung noch leistungsfähiger. Der behobene Bug bei der Hervorhebung bearbeiteter Zeitslots sorgt für eine noch genauere **Zeiterfassungsverwaltung**.

<sub>Zur vollständigen Release-Übersicht: [Release 2.17.0 auf GitHub ansehen](https://github.com/urlaubsverwaltung/zeiterfassung/releases/tag/zeiterfassung-2.17.0)</sub>
