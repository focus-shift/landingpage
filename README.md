# Urlaubsverwaltung

Landing Page für die [Open Source Urlaubsverwaltung & Zeiterfassung](https://github.com/urlaubsverwaltung)

## Development

Was du benötigst:

- Spaß an der Arbeit :o)
- NodeJS
  - die genaue Version findest du in der [.nvmrc](.nvmrc) Datei
  - am besten installierst du dir ein Tool zum Verwalten verschiedener NodeJS Versionen wie z. B. [node version manager (nvm)](https://github.com/creationix/nvm) oder [nodenv](https://github.com/nodenv/nodenv)

Hast du NodeJS installiert und dieses Repository geklont kannst du direkt loswerkeln.

```bash

git clone --depth 1 git@github.com:focus-shift/urlaubsverwaltung-landingpage.git
cd urlaubsverwaltung-landingpage
npm ci
npm run dev
```

`npm run dev` startet einen Server und baut nach dem Bearbeiten von Dateien alles neu.

### git hooks (optional)

Zum Automatisieren verschiedener Dinge bietet dir das Projekt [git hooks](https://git-scm.com/book/uz/v2/Customizing-Git-Git-Hooks)
an. Diese kannst du mit folgendem Befehl installieren:

```bash
git config core.hooksPath '.githooks'
```

Die Githooks sind im [.githooks](./.githooks/) Verzeichnis zu finden.

## Homepage bauen

Eine optimierte Version der Landingpage kannst du bauen mit:

```bash
npm run build
```

### Verzeichnisstruktur

- **public**
  - enthält statische Resourcen die nicht transformiert werden müssen (z. B. favicon, robots.txt, ...)
- **src**
  - enthält den Inhalt der Webseite, CSS, JavaScript und alles was transformiert werden muss.

## Deployment

Jeder commit auf den Branch `main` wird automatisiert gebaut, auf den `gh-pages` branch gemerged und damit live genommen.

siehe `.github/workflows/deployment.yml`

## Hilfreiches

### Bilder optimieren

Resize image, cut file size:

```bash
ffmpeg -i source.jpg -vf scale=2000:-1 -q:v 3 out.jpg
```

Visually lossless, big win (`ffmpeg`): drop to 4:2:0 chroma + high quality factor. Eye can't tell diff, file shrinks a lot.  
`-q:v 2` = near-max quality (scale 2-31, lower better).

```bash
ffmpeg -i source.jpg -q:v 2 -pix_fmt yuv420p out.jpg
```

## Bilder & Icons

- [Bild-Optimierung](https://squoosh.app/)
- Screenshots via [flameshot](https://flameshot.org/)
- [Icon Set](https://heroicons.com/)
