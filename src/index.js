import renderUI, { renderThemeSwitcher } from "./modules/ui.js";
import "./styles/main.css";

const root = document.querySelector(".root");
if (root) {
    const { calcWrapper, inputWindow, buttons } = renderUI();
    const themeSwitcher = renderThemeSwitcher();

    root.innerHTML = ""; // in case if something else calls root
    root.append(calcWrapper, themeSwitcher);

    // TODO: (L) Connect entry point with calculator's logic
    // TODO: (L) Connect entry point with theme switcher's logic
}
