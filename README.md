# Focus Shift Software GmbH - Landingpage

## Development

- [eleventy](https://www.11ty.dev/) static site generator: builds the static html sites which can be found in `build`
  - including assets (css, js) which will be copied
- [snowpack](https://www.snowpack.dev) frontend build tool: optimizes these files and produces the final website in `dist`
  - executes postcss & friends

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

The production build

- creates non optimized html files with [eleventy](https://www.11ty.dev/)
- optimizes (e.g. minfies) html files with `@snowpack/plugin-optimize`
- optimizes css via `@snowpack/plugin-postcss`
- add content hashes to scripts and stylesheets with `./snowpack-plugin-cache-bust`
