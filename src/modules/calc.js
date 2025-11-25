// TODO: (L) RPN
// TODO: (L) Operations сalculations
import { ACTIONS, DEFAULT_INPUT_VAL } from "./constants.js";

let curInput = DEFAULT_INPUT_VAL;

export function handleButtonPress(action, value) {
    switch (action) {
        case ACTIONS.INPUT:
        case ACTIONS.OPERATOR:
            if (curInput === DEFAULT_INPUT_VAL && value !== undefined) {
                curInput = value;
            } else {
                curInput += value;
            }
            break;
        case ACTIONS.CLEAR:
            curInput = DEFAULT_INPUT_VAL;
            break;
        case ACTIONS.DELETE:
            if (curInput.length > 1) {
                curInput = curInput.slice(0, -1);
            } else {
                curInput = DEFAULT_INPUT_VAL;
            }
            break;
        default:
            console.error("There is no the action: ", action);
            break;
    }

    return curInput;
}

export function initInput() {
    return curInput;
}
