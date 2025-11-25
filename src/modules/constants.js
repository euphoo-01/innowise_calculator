export const DEFAULT_INPUT_VAL = "";

export const ACTIONS = {
    INPUT: "input",
    OPERATOR: "operator",
    UNO_OPERATOR: "unary_operator",
    CALCULATE: "calculate",
    CLEAR: "clear",
    DELETE: "delete",
};

export const OPERATION_PRIORITY = {
    // Higher value = higher priority
    "+": 1,
    "-": 1,
    "×": 2,
    "÷": 2,
    "%": 2,
};

export const BUTTONS_SETTINGS = [
    // in rendering order (lines)
    { text: "(", className: "service-btn", actionType: ACTIONS.INPUT, value: "(" },
    { text: ")", className: "service-btn", actionType: ACTIONS.INPUT, value: ")" },
    { text: "", className: "", actionType: null },
    { text: "", className: "", actionType: null },

    { text: "AC", className: "service-btn", actionType: ACTIONS.CLEAR },
    {
        text: "±",
        className: "service-btn",
        actionType: ACTIONS.UNO_OPERATOR,
        value: "sign",
    },
    { text: "%", className: "operation-btn", actionType: ACTIONS.OPERATOR, value: "%" },
    { text: "÷", className: "operation-btn", actionType: ACTIONS.OPERATOR, value: "÷" },

    { text: "7", className: "num-btn", actionType: ACTIONS.INPUT, value: "7" },
    { text: "8", className: "num-btn", actionType: ACTIONS.INPUT, value: "8" },
    { text: "9", className: "num-btn", actionType: ACTIONS.INPUT, value: "9" },
    { text: "+", className: "operation-btn", actionType: ACTIONS.OPERATOR, value: "+" },

    { text: "4", className: "num-btn", actionType: ACTIONS.INPUT, value: "4" },
    { text: "5", className: "num-btn", actionType: ACTIONS.INPUT, value: "5" },
    { text: "6", className: "num-btn", actionType: ACTIONS.INPUT, value: "6" },
    { text: "×", className: "operation-btn", actionType: ACTIONS.OPERATOR, value: "×" },

    { text: "1", className: "num-btn", actionType: ACTIONS.INPUT, value: "1" },
    { text: "2", className: "num-btn", actionType: ACTIONS.INPUT, value: "2" },
    { text: "3", className: "num-btn", actionType: ACTIONS.INPUT, value: "3" },
    { text: "-", className: "operation-btn", actionType: ACTIONS.OPERATOR, value: "-" },

    { text: "⌫", className: "service-btn", actionType: ACTIONS.DELETE },
    { text: "0", className: "num-btn", actionType: ACTIONS.INPUT, value: "0" },
    { text: ",", className: "service-btn", actionType: ACTIONS.INPUT, value: "." },
    { text: "=", className: "operation-btn", actionType: ACTIONS.CALCULATE },
];
