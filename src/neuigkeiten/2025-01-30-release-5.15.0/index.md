---
draft: false
layout: layout-blog-article.hbs
date: 2025-05-02
title: Urlaubsverwaltung 5.15.0 – Noch schneller!
author: Andreas Weigel
release-version: 5.15.0
description: Version 5.15.0 verbessert die Datenbankabfragen in PostgreSQL durch gezielte Foreign Key Indexierung – ein wichtiger Schritt zu besserer Skalierbarkeit und Geschwindigkeit.
tags:
  - update
---

Mit dem **Release 5.15.0** legt die Urlaubsverwaltung den Fokus auf eine technische Optimierung im Hintergrund.

<!-- more -->

### Noch schneller!

In dieser Version wurde gezielt die **Indexierung von Fremdschlüsseln** in der Datenbankstruktur überprüft und angepasst. Das Ziel: eine **schnellere Urlaubsverwaltung**, vor allem bei hoher Datenlast.

**Was wurde gemacht?**

Das wird nun ein wenig technisch. Aber vielleicht interessiert es dich ja:

- Analyse bestehender Foreign Keys
- Ergänzung fehlender Indizes
- Optimierung der Datenbankzugriffe

**Warum ist das wichtig?**

- Besonders bei **Urlaubsstatistiken**, **Genehmigungsprozessen** und vielen weiteren Seiten wird die Urlaubsverwaltung nun effizienter arbeiten.
- Bei größeren Installationen mit vielen Benutzern oder Daten wächst die Belastung auf die Datenbank – hier helfen saubere Indizes, um Anfragen deutlich schneller auszuführen.

## Fazit

Auch wenn es auf den ersten Blick ein kleines Update ist: **Release 5.15.0** bringt eine spürbare **schnellere Urlaubsverwaltung**. Es ist ein technischer Meilenstein auf dem Weg zu einer noch robusteren und skalierbareren Anwendung.

<sub>Zur vollständigen Release-Übersicht: [Release 5.15.0 auf GitHub ansehen](https://github.com/urlaubsverwaltung/urlaubsverwaltung/releases/tag/urlaubsverwaltung-5.15.0)</sub>
