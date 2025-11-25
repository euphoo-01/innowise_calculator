import { BUTTONS_SETTINGS, DEFAULT_INPUT_VAL } from "./constants";

/**
 * @returns {{calcWrapper: HTMLElement, input: HTMLElement, buttons: HTMLElement[]}}
 */

export default function renderUI() {
    const calcWrapper = document.createElement("section");
    calcWrapper.className = "calc-wrapper";

    const display = document.createElement("div");
    display.className = "calc-input";
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

    return { calcWrapper, input: display, buttons };
}
