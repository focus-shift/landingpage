---
draft: false
layout: layout-blog-article.hbs
date: 2023-02-23
title: Zeiterfassung - Arbeitszeiten, neue Berichte und geleistete Stunden
author: Andreas Weigel
teaserImage: /static/img/zeiterfassung-multi-device.png
description: Zeiterfassung - Arbeitszeiten konfigurieren, neue Berichte erstellen und geleistete Stunden vergleichen
tags:
  - blog
---

Wir haben in der neuen Version der Zeiterfassung viel von eurem Feedback umsetzen können.
Mit dabei sind verbesserte Einsichten in die geleisteten Stunden deiner Mitarbeitenden und auch die Erfassung von
Sollstunden bzw. die dazugehörige Pflege von Arbeitszeiten.

<!-- more -->

## Geleisteten Stunden von Mitarbeitenden

Unter Berichte konnten bereits die geleisteten Stunden pro Mitarbeitende eingesehen werden in Form einer Grafik sowie
als CSV-Download. Diese Ansicht wurde nun erweitert, um die einzelnen Zeitbuchungen der Mitarbeitenden. Diese können
nach Mitarbeitenden selektiert anzeigt werden. Auch die Auswahl von mehreren Mitarbeitenden ist möglich. Zusätzlich
erhält mal durch die Auswahl des jeweiligen Tages schnell einen Überblick wann und wie tatsächlich gearbeitet wurde.

<div class="flex my-8">
    <figure>
            <img
              src="zeiterfassung-person-details.png"
              alt="Auswahl einer Person zur Ansicht der gebuchten Zeiten"
              class="rounded-lg"
            />
        <figcaption class="text-sm text-center">Auswahl einer Person zur Ansicht der gebuchten Zeiten</figcaption>
    </figure>
</div>

## Arbeitszeiten festlegen

Die Zeiterfassung wurde um die Konfiguration von Arbeitszeiten erweitert. Diese können nun pro Mitarbeitende eingestellt werden.
Es ist möglich für die ganze Woche, als auch feingranular pro Tag die Arbeitszeiten festzulegen.
Diese Einstellung kann durch eine Person mit der entsprechenden Berechtigung vorgenommen werden.

<div class="flex my-8">
    <figure>
            <img
              src="zeiterfassung-workingtime.png"
              alt="Einstellung der Arbeitszeiten pro Mitarbeitenden"
              class="rounded-lg"
            />
        <figcaption class="text-sm text-center">Einstellung der Arbeitszeiten pro Mitarbeitenden</figcaption>
    </figure>
</div>

Die gepflegten Arbeitszeiten fließen nach der Konfiguration in die Berechnung der Plan- und tatsächliche erfassten Arbeitszeiten mit ein.

## Wie viel habe ich diese Woche schon geschafft?

Die Arbeitszeiten fliesen nun auch in die Zeiterfassung mit ein. So ist jetzt auf Tages- als auch auf Wochenebene einsehbar wie viel Zeit
bereits von der geplanten Arbeitszeit geleistet wurde. Auch Überstunden sind in der Darstellung direkt sichtbar.

<div class="flex my-8">
    <figure>
            <img
              src="zeiterfassung-new-timeslot.png"
              alt="Darstellung der geplanten Arbeitszeiten und der geleisteten Stunden"
              class="rounded-lg"
            />
        <figcaption class="text-sm text-center">Darstellung der geplanten Arbeitszeiten und der geleisteten Stunden</figcaption>
    </figure>
</div>

In den Berichten ist ebenfalls der Vergleich von Planarbeitszeiten und tatsächlich geleisteten Stunden grafisch aufbereitet
und können sowohl auf Wochen- als auch Monatsbasis aggregiert angezeigt werden.

<div class="flex my-8">
    <figure>
            <img
              src="zeiterfassung-report-week.png"
              alt="Wöchentliche Berichte mit grafischer Darstellung der geplanten Arbeitszeiten"
              class="rounded-lg"
            />
        <figcaption class="text-sm text-center">Wöchentliche Berichte mit grafischer Darstellung der geplanten Arbeitszeiten</figcaption>
    </figure>
</div>

<div class="flex my-8">
    <figure>
            <img
              src="zeiterfassung-report-month.png"
              alt="Monatliche Berichte mit grafischer Darstellung der geplanten Arbeitszeiten"
              class="rounded-lg"
            />
        <figcaption class="text-sm text-center">Monatliche Berichte mit grafischer Darstellung der geplanten Arbeitszeiten</figcaption>
    </figure>
</div>

## Roadmap zur Zeiterfassung

Folgende Features sind außerdem geplant für die Zeiterfassung:

- Automatische Synchronisation von Abwesenheiten aus der Urlaubsverwaltung
- Automatische Synchronisation von Überstunden in die Urlaubsverwaltung
- Automatisierte Berechnung der Pausenzeiten
- Projektzeiterfassung
