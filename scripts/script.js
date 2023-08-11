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
    if ((value === '.' && currentInputBot.includes('.')) || currentInputBot.length === 9) {
        return;
    }

    if (currentInputTop == "Infinity, that's too much!" || currentInputBot == "Infinity, that's too much!") {
        clearDisplay();
        return;
    };
    currentInputBot += value;
    displayValue();
};

function chooseOperator(chosenOperator) {
    if (currentInputBot === '') {
        return;
    }
    if (currentInputTop == "Infinity, thats too much!" || currentInputBot == "Infinity, that's too much!") {
        clearDisplay();
        return;
    }
    if (currentInputTop !== '') {
        operation();
    }
    operator = chosenOperator;
    currentInputTop = currentInputBot;
    currentInputBot = '';
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
            result = numberTop / numberBot;
            break;
        case '*':
            result = numberTop * numberBot;
            break;
        default:
            return;
    }

    if (!isFinite(result)) {
        result = "Infinity, that's too much!";
    } else if (isNaN(result)) {
        result = '0';
    }

    currentInputBot = result.toString();
    operator = '';
    currentInputTop = '';
    displayValue();
}

function clearDisplay() {
    currentInputTop = '';
    currentInputBot = "";
    displayValue();
};

function backspace() {
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
        operator = button.value;
        chooseOperator(operator);
    });
});

function calculateAnswer() {
    operation();
};

equalsBtn.addEventListener("click", calculateAnswer);

clearBtn.addEventListener('click', clearDisplay);

backspaceBtn.addEventListener('click', backspace);

document.addEventListener("keydown", event => {
    const key = event.key;

    if (key === '=' || key === 'Enter') {
        calculateAnswer();
    } else if (key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        chooseOperator(key);
    } else if (/^\d$/.test(key)) {
        addNumber(key);
    };
});