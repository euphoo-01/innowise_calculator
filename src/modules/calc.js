import { ACTIONS, DEFAULT_INPUT_VAL, OPERATIONS } from "./constants.js";

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
                            .replace(/\+-/g, "-")
                            .replace(/--/g, "+");
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
    const originalTokens = infixStr.match(/(\d+(\.\d+)?|[+\-×÷()%])/g);
    if (!originalTokens) {
        return "";
    }

    const tokens = [];
    let i = 0;
    while (i < originalTokens.length) {
        // processing unary minuses
        const token = originalTokens[i];

        if (token === "-") {
            const prevToken = i > 0 ? originalTokens[i - 1] : null;
            // unary minus = minus at the start, or after another operator or an opening paren.
            if (prevToken === null || OPERATIONS[prevToken] || prevToken === "(") {
                const nextToken = originalTokens[i + 1];
                if (
                    nextToken &&
                    !isNaN(parseFloat(nextToken)) &&
                    !OPERATIONS[nextToken]
                ) {
                    tokens.push(`-${nextToken}`);
                    i += 2; // - and num
                    continue;
                }
            }
        }

        tokens.push(token);
        i++;
    }

    // validate for repeated operators
    for (let i = 0; i < tokens.length - 1; i++) {
        const isOperator = (token) => OPERATIONS[token];
        if (isOperator(tokens[i]) && isOperator(tokens[i + 1])) {
            throw new Error("Invalid expression");
        }
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
                throw new Error("Invalid parentheses");
            }
            continue;
        }
    }

    while (operatorStack.length > 0) {
        const stackTop = operatorStack.pop();
        if (stackTop === "(") {
            throw new Error("Invalid parentheses");
        }
        outputQueue.push(stackTop);
    }

    return outputQueue.join(" ");
}

function calculate(infixStr) {
    const postfixStr = convertToRPN(infixStr);
    const tokens = postfixStr.split(" ").filter((t) => t);

    const digitsStack = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (!isNaN(parseFloat(token))) {
            digitsStack.push(parseFloat(token));
            continue;
        }

        if (token === "%") {
            const operand = digitsStack.pop();
            if (operand === undefined) continue;

            if (digitsStack.length > 0) {
                const leftContext = digitsStack[digitsStack.length - 1];

                if (i + 1 < tokens.length) {
                    // different formulas for different operators
                    const nextOp = tokens[i + 1];
                    if (nextOp === "+" || nextOp === "-") {
                        digitsStack.push((leftContext * operand) / 100);
                    } else {
                        digitsStack.push(operand / 100);
                    }
                } else {
                    digitsStack.push(operand / 100);
                }
            } else {
                digitsStack.push(operand / 100);
            }
            continue;
        }

        if (OPERATIONS[token]) {
            const op = OPERATIONS[token];
            if (!op.calc) continue;

            const rightOperand = digitsStack.pop();
            const leftOperand = digitsStack.pop();
            if (rightOperand !== undefined && leftOperand !== undefined) {
                const result = op.calc(leftOperand, rightOperand);
                if (!isFinite(result)) {
                    throw new Error("Division by zero");
                }
                digitsStack.push(result);
            }
        }
    }

    if (digitsStack.length === 1) {
        return digitsStack[0];
    } else {
        throw new Error("Invalid Expression");
    }
}
