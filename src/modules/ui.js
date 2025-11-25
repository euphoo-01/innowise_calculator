import { BUTTONS_SETTINGS, DEFAULT_INPUT_VAL } from "./constants.js";
/**
 * @returns {{calcWrapper: HTMLElement, inputWindow: HTMLElement, buttons: HTMLElement[]}}
 */

export default function renderUI() {
    const calcWrapper = document.createElement("section");
    calcWrapper.className = "calc-wrapper";

    const display = document.createElement("div");
    display.className = "calc-inputWindow";
    display.textContent = DEFAULT_INPUT_VAL;

    const keyboardWrapper = document.createElement("div");
    keyboardWrapper.className = "calc-kb-wrapper";

    const buttons = BUTTONS_SETTINGS.map((btnConfEl) => {
        const btn = document.createElement("button");

        if (!btnConfEl.text) {
            btn.className = "calc-kb-el empty";
            btn.disabled = true;
            return btn;
        }

        btn.textContent = btnConfEl.text;
        btn.className = `calc-kb-el ${btnConfEl.className}`;

        if (btnConfEl.actionType) {
            btn.dataset.actionType = btnConfEl.actionType;
        }

        if (btnConfEl.value !== null) {
            btn.dataset.value = btnConfEl.value;
        }

        return btn;
    });

    keyboardWrapper.append(...buttons);

    calcWrapper.append(display, keyboardWrapper);

    return { calcWrapper, inputWindow: display, buttons };
}

export function renderThemeSwitcher() {
    const toggleWrapper = document.createElement("div");
    toggleWrapper.className = "theme-toggler-wrapper";

    const label = document.createTextNode("Сменить тему");

    const themeSwitcher = document.createElement("label");

    themeSwitcher.className = "theme-toggler";

    const themeCheckbox = document.createElement("input");
    themeCheckbox.type = "checkbox";
    themeCheckbox.id = "theme-switch";
    themeCheckbox.className = "toggle-checkbox";

    const slider = document.createElement("span");
    slider.className = "toggle-slider";

    themeSwitcher.htmlFor = themeCheckbox.id;
    themeSwitcher.append(themeCheckbox, slider);
    toggleWrapper.append(themeSwitcher, label);

    return toggleWrapper;
}
