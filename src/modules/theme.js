// TODO: (L) Theme handlers, based on global CSS vars
import { THEME_LOCAL_STORAGE_KEY } from "./constants.js";

function applyTheme(theme, root) {
    root.dataset.theme = theme;
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
}

export function handleThemeSwitch(switcher, root) {
    switcher.addEventListener("change", () => {
        console.log("clicked");
        const newTheme = switcher.checked ? "dark" : "light";
        applyTheme(newTheme, root);
    });
}

export function initTheme(toggler, root) {
    const choosenTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

    let currentTheme;

    if (choosenTheme) {
        currentTheme = choosenTheme;
    }

    applyTheme(currentTheme, root);

    if (toggler) {
        toggler.checked = currentTheme === "dark";
    }
}
