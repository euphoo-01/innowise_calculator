import { ACTIONS, DEFAULT_INPUT_VAL, OPERATIONS } from "./constants.js";

let curInput = DEFAULT_INPUT_VAL;

// TODO: (L) Input validation, brackets flags
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
        case ACTIONS.UNO_OPERATOR:
            if (curInput && curInput !== DEFAULT_INPUT_VAL) {
                let lastOpIndex = -1;
                for (let i = curInput.length - 1; i >= 0; i--) {
                    if (i === 0 && curInput[i] === "-") continue;

                    if (["+", "-", "÷", "×"].includes(curInput[i])) {
                        if (i > 0 && ["+", "-", "÷", "×"].includes(curInput[i - 1])) {
                            continue;
                        }
                        lastOpIndex = i;
                        break;
                    }
                }

                let prefix = "";
                let numStr = curInput;

                if (lastOpIndex !== -1) {
                    prefix = curInput.substring(0, lastOpIndex + 1);
                    numStr = curInput.substring(lastOpIndex + 1);
                }

                if (numStr && !isNaN(parseFloat(numStr))) {
                    const newNum = -parseFloat(numStr);
                    let newCurInput = prefix + newNum.toString();

                    if (newCurInput.includes("+-") || newCurInput.includes("--")) {
                        newCurInput = newCurInput
                            .replace(/\+\-/g, "-")
                            .replace(/\-\-/g, "+");
                    }

                    curInput = newCurInput;
                }
            }
            break;
        case ACTIONS.CALCULATE:
            curInput = calculate(curInput);
            break;
        default:
            console.error("The action is not defined: ", action);
            break;
    }

    return curInput;
}

export function initInput() {
    return curInput;
}

/**
 * @param {string} infixStr - Expression in infix form.
 * @returns {string} - Expression in RPN.
 */
function convertToRPN(infixStr) {
    const tokens = infixStr.match(/(\d+(\.\d+)?|[+\-×÷()])/g);
    if (!tokens) {
        return "";
    }

    const outputQueue = [];
    const operatorStack = [];

    for (const token of tokens) {
        if (!isNaN(parseFloat(token))) {
            outputQueue.push(token);
            continue;
        }

        if (OPERATIONS[token]) {
            const currentOpPriority = OPERATIONS[token].priority;
            let stackTop = operatorStack[operatorStack.length - 1];

            while (
                stackTop &&
                stackTop !== "(" &&
                OPERATIONS[stackTop].priority >= currentOpPriority
            ) {
                outputQueue.push(operatorStack.pop());
                stackTop = operatorStack[operatorStack.length - 1];
            }
            operatorStack.push(token);
            continue;
        }

        if (token === "(") {
            operatorStack.push(token);
            continue;
        }

        if (token === ")") {
            let stackTop = operatorStack.pop();
            while (stackTop && stackTop !== "(") {
                outputQueue.push(stackTop);
                stackTop = operatorStack.pop();
            }
            if (stackTop !== "(") {
                throw new Error("Mismatched parentheses!");
            }
            continue;
        }
    }

    while (operatorStack.length > 0) {
        const stackTop = operatorStack.pop();
        if (stackTop === "(") {
            throw new Error("Mismatched parentheses!");
        }
        outputQueue.push(stackTop);
    }

    return outputQueue.join(" ");
}

function calculate(infixStr) {
    const postfixStr = convertToRPN(infixStr);
    const tokens = postfixStr.split(" ");

    const digitsStack = [];

    for (const token of tokens) {
        if (!isNaN(parseFloat(token))) {
            digitsStack.push(parseFloat(token));
            continue;
        }

        if (OPERATIONS[token]) {
            const op = OPERATIONS[token];
            const argCount = op.calc.length; // operator is binary or unary?

            if (argCount === 1) {
                // handle unary
                const operand = digitsStack.pop();
                if (operand !== undefined) {
                    digitsStack.push(op.calc(operand));
                }
            } else if (argCount === 2) {
                // handle binary
                const rightOperand = digitsStack.pop();
                const leftOperand = digitsStack.pop();
                if (rightOperand !== undefined && leftOperand !== undefined) {
                    digitsStack.push(op.calc(leftOperand, rightOperand));
                }
            }
        }
    }

    if (digitsStack.length === 1) {
        return digitsStack[0];
    } else {
        return NaN;
    }
}
