# Task

You can get acquainted with task [there](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0#heading=h.rtfo3o71ktll)

# How to run

You have to install `Node.js` to your system.

### Local dev server:

1. Run `npm ci`
2. Run `npm start`

### Or you can build:

1. Run `npm ci`
2. Change field `mode` to `"production"` in `./webpack.config.js` file
3. Run `npm run build`
4. Open `./dist/` folder
5. Run `index.html` file in your browser

# Structure

```bash
- src/
  - assets/             # Static stuff (fonts, imgs, icons)
      - settings.svg
  - modules/            # JS source files
      - calc.js         # Business logic
      - constants.js    # Configuration objects
      - theme.js        # Theme switcher logic
      - ui.js           # UI rendering
  - styles/             # CSS styles
      - dark.css
      - light.css
      - main.css        # CSS entry point
  - index.html          # Template for build
  - index.js            # JS entry point
- .eslintrc.json        # ESLint configuration
- .prettierrc.json      # Prettier configuration
- package.json          # NPM configuration, metadata, deps, scripts
- package-lock.json
- webpack.config.js     # Webpack builder configuration
```

I decided to separate business logic from the UI, while building this project.

# Realization details

- Expressions calculation based on Reversed Polish Notation.
- UI is generated in JS module
- Webpack deletes `console` methods in production build
