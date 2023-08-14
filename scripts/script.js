'use strict';

const clearBtn = document.querySelector('[data-clear]');
const backspaceBtn = document.querySelector('[data-backspace]');
const equalsBtn = document.querySelector('[data-equals]');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const inputTop = document.querySelector('[data-inputTop]');
const inputBot = document.querySelector('[data-inputBot]');

let currentInputTop = '';
let currentInputBot = '';
let operator = '';
let result = 0;

function displayValue() {
    inputBot.textContent = currentInputBot;
    inputTop.textContent = currentInputTop;
};

function addNumber(value) {
    if ((value === '.' && currentInputBot.includes('.')) || currentInputBot.length === 12) {
        return;
    }
    if (currentInputBot === '0' && value === '0' && currentInputBot.includes('0')) {
        return;
    }
    if (currentInputTop == "Cannot divide by 0" || currentInputBot == "Cannot divide by 0") {
        clearDisplay();
        return;
    }

    if (value === '.') {
        if (currentInputBot.includes('.')) {
            return;
        }
        currentInputBot += value;
    } else {
        const decimalIndex = currentInputBot.indexOf('.');
        if (decimalIndex !== -1 && currentInputBot.length - decimalIndex > 3) {
            return;
        }
        currentInputBot += value;
    }

    displayValue();
}

function chooseOperator(chosenOperator) {
    if (currentInputBot === '') {
        return;
    } else if (currentInputTop == "Cannot divide by 0" || currentInputBot == "Cannot divide by 0") {
        clearDisplay();
        return;
    } else if (currentInputTop !== '') {
        operation();
    } else {
        operator = chosenOperator;
        currentInputTop = `${currentInputBot}  ${operator}`;
        currentInputBot = '';
        displayValue();
    }
};

function operation() {
    const numberTop = parseFloat(currentInputTop);
    const numberBot = parseFloat(currentInputBot);
    if (isNaN(numberTop) || isNaN(numberBot)) {
        return;
    }

    switch (operator) {
        case '+':
            result = numberTop + numberBot;
            break;
        case '-':
            result = numberTop - numberBot;
            break;
        case '/':
            if (numberBot === 0) {
                result = "Cannot divide by 0"
            } else {
                result = numberTop / numberBot;
            }
            break;
        case '*':
            result = numberTop * numberBot;
            break;
        default:
            return;
    }

    if (!isFinite(result)) {
        result = "Cannot divide by 0";
    } else if (isNaN(result)) {
        result = '0';
    }

    if (result % 1 !== 0) {
        result = result.toFixed(3);
    }

    currentInputBot = result.toString();
    operator = '';
    currentInputTop = '';
    displayValue();
};

function clearDisplay() {
    currentInputTop = '';
    currentInputBot = "";
    displayValue();
};

function backspace() {
    if ((currentInputTop.includes("+") || currentInputTop.includes("-") || currentInputTop.includes("/") || currentInputTop.includes("*")) && currentInputBot == "") {
        operator == "";
        currentInputBot = currentInputTop;
        currentInputTop = "";
        currentInputBot = currentInputBot.slice(0, -1);
        currentInputBot = currentInputBot.slice(0, -1);
    }
    currentInputBot = currentInputBot.slice(0, -1);
    displayValue();
};

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        addNumber(value);
    });
});

operatorBtns.forEach(button => {
    button.addEventListener("click", () => {
        operation();
        operator = button.value;
        chooseOperator(operator);
    });
});

equalsBtn.addEventListener("click", operation);

clearBtn.addEventListener('click', clearDisplay);

backspaceBtn.addEventListener('click', backspace);

document.addEventListener("keydown", event => {
    const key = event.key;

    if (key === '=' || key === 'Enter') {
        operation();
    } else if (key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operation();
        operator = key;
        chooseOperator(key);
    } else if (/^\d$/.test(key) || key == ".") {
        addNumber(key);
    };
});