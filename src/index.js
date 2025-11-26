import renderUI, { renderThemeSwitcher } from "./modules/ui.js";
import { initTheme, handleThemeSwitch } from "./modules/theme.js";
import { initInput, handleButtonPress } from "./modules/calc.js";
import "./styles/main.css";

const root = document.querySelector(".root");
if (root) {
    const { calcWrapper, inputWindow, buttons } = renderUI();
    const themeSwitcher = renderThemeSwitcher();

    root.innerHTML = ""; // in case if something else calls root
    root.append(calcWrapper, themeSwitcher);

    initTheme(themeSwitcher.querySelector(".toggle-checkbox"), root);
    handleThemeSwitch(themeSwitcher.querySelector(".toggle-checkbox"), root);

    const inputVal = initInput();
    inputWindow.textContent = inputVal;

    buttons.forEach((btn) =>
        btn.addEventListener("click", () => {
            try {
                inputWindow.classList.remove("error");

                const result = handleButtonPress(
                    btn.dataset.actionType,
                    btn.dataset.value,
                );

                inputWindow.textContent = result;
            } catch (e) {
                // highlighting input window if there is an error
                console.error(e.message);
                inputWindow.classList.add("error");
            }
        }),
    );
}
