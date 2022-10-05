# Focus Shift Software GmbH - Landingpage

## Development

- [eleventy](https://www.11ty.dev/) static site generator: builds the static html sites which can be found in `build`
  - including assets (css, js) which will be copied

start developing with hot module reloading in the browser:

first install all dependencies with

```bash
npm install
```

then run

```bash
npm run dev
```

build the production page:

```bash
npm run build
```

### git hooks (optional)

Zum Automatisieren verschiedener Dinge bietet dir das Projekt [git hooks](https://git-scm.com/book/uz/v2/Customizing-Git-Git-Hooks)
an. Diese kannst du mit folgendem Befehl installieren:

```bash
./scripts/install-git-hooks.sh
```

### The production build

- creates non optimized html files with [eleventy](https://www.11ty.dev/)
- optimizes (e.g. minfies) html files with `@snowpack/plugin-optimize`
- optimizes css via `@snowpack/plugin-postcss`
- add content hashes to scripts and stylesheets with `./snowpack-plugin-cache-bust`
