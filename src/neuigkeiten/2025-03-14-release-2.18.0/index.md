---
draft: false
layout: layout-blog-article.hbs
date: 2025-05-28
title: Zeiterfassung 2.18.0 – Verbesserte Performance & Personensuche
author: Andreas Weigel
release-version: 2.18.0
description: Release 2.18.0 verbessert die Performance der Zeiterfassung und behebt mehrere Fehler, darunter Probleme bei der Personensuche.
tags:
  - update
---

Das **Release 2.18.0** bringt wichtige Verbesserungen für die **Performance** der Zeiterfassung, insbesondere im Bereich der **Datenbankoptimierung**. Außerdem wurden mehrere **Fehler** behoben, die die Benutzererfahrung beeinträchtigten.

<!-- more -->

## Verbesserungen

### Die Zeiterfassung wird schneller

Jetzt wird es ein wenig technisch – aber keine Sorge, wir erklären es einfach!

Wir haben die **Zugriffe** auf die Datenbank vorangetrieben - also da wo eure und unsere Daten gespeichert werden - verbessert.
Damit wird die **Performance** der Zeiterfassung erheblich gesteigert, da die Datenbank nicht so lange suchen muss. Das kennen wir alle,
wir suchen etwas und es dauert ewig, bis wir es finden. Das ist jetzt vorbei! Die Zeiterfassung weiß nun genau, wo sie suchen muss.

> **Warum ist das wichtig?**  
> Die Optimierung sorgt für eine **flüssigere Benutzererfahrung** und somit macht es viel mehr Spaß mit der Zeiterfassung zu arbeiten.

## Fehlerbehebungen

### Suche nach einer Person mit Vorname und Nachname ergab keine Treffer

Ein Problem bei der **Personensuche** wurde behoben. Bisher war es nicht möglich, eine Person korrekt zu finden,
wenn man sowohl den **Vornamen** als auch den **Nachnamen** eingab. Dies führte dazu, dass keine Treffer angezeigt wurden,
obwohl die Person in der Zeiterfassung natürlich existierte.

> **Warum ist das wichtig?**  
> Die Korrektur dieses Bugs stellt sicher, dass die **Suche nach Personen** wie erwartet funktioniert.
> Gerade bei großen Teams ist eine **schnelle und präzise Personensuche** entscheidend für die effiziente Zeiterfassung.

## Fazit

**Release 2.18.0** bringt mit der Verbesserung des **PostgreSQL-Indexing** eine wichtige **Performance-Steigerung**,
die die Anwendung schneller und effizienter macht. Die behobenen **Bugs** sorgen für eine verbesserte Benutzererfahrung,
insbesondere bei der **Personensuche**.

<sub>Zur vollständigen Release-Übersicht: [Release 2.18.0 auf GitHub ansehen](https://github.com/urlaubsverwaltung/zeiterfassung/releases/tag/zeiterfassung-2.18.0)</sub>
