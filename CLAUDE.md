# CLAUDE.md

Die Seite ist auf Deutsch. Texte folgen der deutschen Rechtschreibung und Typografie (Duden), nicht der englischen.

## Striche

| Zeichen | Name                             | Verwendung                                        | Beispiel                                                   |
| ------- | -------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `-`     | Bindestrich                      | Zusammensetzungen, Ergänzungen                    | `Mitarbeiter-App`, `Arbeitszeit- und Abwesenheitsdaten`    |
| `–`     | Gedankenstrich (mit Leerzeichen) | Einschub, Nachtrag, Trenner in Titeln             | `Zeiten erfassen – mit der App`, `title: Kalender – Hilfe` |
| `–`     | Bis-Strich (ohne Leerzeichen)    | Bereiche bei Zahlen, Zeiten, Wochentagen          | `8–12 Uhr`, `S. 1–32`, `Mo–Fr`                             |
| `—`     | Geviertstrich                    | **nicht verwenden**, das ist englische Typografie | –                                                          |

- Den Gedankenstrich und den Bis-Strich immer als Zeichen `–` (U+2013) schreiben, nie als `&ndash;`, `&mdash;` oder `-`.
  `title` und `description` aus dem Front Matter werden mit `{{title}}` escaped ausgegeben, ein `&ndash;` stünde dort als Text im Browser-Tab und im Suchergebnis.
- Bei „von … bis“ das Wort ausschreiben statt eines Strichs: `vom 23.11. bis 27.11.`, nicht `vom 23.11.–27.11.`.

`npm run check:dashes` (läuft auch in der CI) meldet Geviertstriche, `&ndash;`/`&mdash;`, einen Bindestrich mit Leerzeichen als Gedankenstrich im Fließtext und Bereiche mit Leerzeichen um den Strich.
Bereiche ohne Leerzeichen mit Bindestrich (`8-12 Uhr`) erkennt der Check nicht, da sie von Datumsangaben, Versionen und Hausnummern nicht zu unterscheiden sind.
