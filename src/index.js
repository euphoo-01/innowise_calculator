import renderUI, { renderThemeSwitcher } from "./modules/ui.js";
import { initTheme, handleThemeSwitch } from "./modules/theme.js";
import "./styles/main.css";

const root = document.querySelector(".root");
if (root) {
    const { calcWrapper, inputWindow, buttons } = renderUI();
    const themeSwitcher = renderThemeSwitcher();

    root.innerHTML = ""; // in case if something else calls root
    root.append(calcWrapper, themeSwitcher);

    initTheme(themeSwitcher.querySelector(".toggle-checkbox"), root);
    handleThemeSwitch(themeSwitcher.querySelector(".toggle-checkbox"), root);

    // TODO: (L) Connect entry point with calculator's logic
    // TODO: (L) Connect entry point with theme switcher's logic
}
