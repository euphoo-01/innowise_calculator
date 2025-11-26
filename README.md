# Task

You can get acquainted with task [there](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0#heading=h.rtfo3o71ktll)

# How to run

You have to install `Node.js` to your system.

Project has been deployed to github pages. You can have acces to it via [link](https://euphoo-01.github.io/innowise_calculator)

### Local dev server:

1. Run `npm i`
2. Run `npm start`

### Or you can build:

1. Run `npm i`
2. Run `npm run build`
3. Open `./dist/` folder
4. Run `index.html` file in your browser

# Structure

```bash
- .husky/
  - _/
  - pre-push            # Pre push hook configuration
- src/
  - assets/             # Static stuff (fonts, imgs, icons)
      - Roboto.woff2
  - modules/            # JS source files
      - calc.js         # Business logic
      - constants.js    # Configuration objects
      - theme.js        # Theme switcher logic
      - ui.js           # UI rendering
  - styles/             # CSS styles
      - dark.css        # Variables for dark theme
      - light.css       # Variables for light theme
      - main.css        # Main styles
  - index.html          # Template for build
  - index.js            # JS entry point
- .eslintrc.json        # ESLint configuration
- .prettierrc.json      # Prettier configuration
- package.json          # NPM configuration, metadata, deps, scripts
- package-lock.json
- webpack.config.сjs     # Webpack builder configuration
```

I decided to separate business logic from the UI, while building this project.

# Realization details

- Calculator can add, substract, divide, multiply, change operations priority, work with percents
- Expressions calculation based on Reversed Polish Notation.
- If there is an error, the input window border becomes red
- Dark and light theme switching implemented
- Theme choice is saved to local storage
- Webpack deletes `console` methods in production build
- Simple CI/CD pipeline, building and deploying project to GitHub Pages
