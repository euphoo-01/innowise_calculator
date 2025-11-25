import renderUI from "./modules/ui";

const root = document.querySelector(".root");
if (root) {
    const { calcWrapper, input, buttons } = renderUI();

    root.innerHTML = ""; // in case if something else calls root
    root.append(calcWrapper);

    // TODO: (L) Connect entry point with calculator's logic
    // TODO: (L) Connect entry point with theme switcher's logic
}
