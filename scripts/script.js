'use strict';

// Selectors
const clearBtn = document.querySelector('[data-clear]');
const backspaceBtn = document.querySelector('[data-backspace]');
const equalsBtn = document.querySelector('[data-equals]');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const decimalBtn = document.querySelector('[data-number][value="."]');
const inputTop = document.querySelector('[data-inputTop]');
const inputBot = document.querySelector('[data-inputBot]');

// State
let currentInputTop = '';
let currentInputBot = '';
let operator = '';
let result = 0;

// Display update
function updateDisplay() {
    inputBot.textContent = currentInputBot;
    inputTop.textContent = currentInputTop;
}

// Clear the display
function clearDisplay() {
    currentInputTop = '';
    currentInputBot = '';
    operator = '';
    result = 0;
    updateDisplay();
}

// Add a number to the input
function addNumber(value) {
    if (currentInputTop !== '' && operator === '') {
        clearDisplay();
    }

    if ((value === '.' && currentInputBot.includes('.')) || currentInputBot.length === 9) {
        return;
    }

    currentInputBot += value;
    updateDisplay();
}

// Add decimal point
function addDecimal() {
    if (currentInputTop !== '' && operator === '') {
        clearDisplay();
    }

    if (!currentInputBot.includes('.')) {
        currentInputBot += '.';
        updateDisplay();
    }
}

// Choose an operator
function chooseOperator(chosenOperator) {
    if (currentInputBot === '' && result === 0) {
        return;
    }

    if (currentInputTop.includes("Infinity")) {
        clearDisplay();
        return;
    }

    if (operator !== '' && currentInputTop !== '') {
        operation();
    }

    operator = chosenOperator;
    if (currentInputTop === '') {
        currentInputTop = currentInputBot + ` ${operator}`;
        currentInputBot = '';
    } else {
        currentInputTop = currentInputBot + ` ${operator}`;
    }
    updateDisplay();
}

// Perform the operation
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
    updateDisplay();
}

// Handle backspace
function handleBackspace() {
    currentInputBot = currentInputBot.slice(0, -1);
    updateDisplay();
}

// Handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;

    if (key === '=' || key === 'Enter') {
        operation();
    } else if (key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        handleBackspace();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        chooseOperator(key);
    } else if (/^\d$/.test(key) || key === ".") {
        addNumber(key);
    }
}

// Attach event listeners
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

decimalBtn.addEventListener("click", () => {
    addDecimal();
});

equalsBtn.addEventListener("click", operation);
clearBtn.addEventListener('click', clearDisplay);
backspaceBtn.addEventListener('click', handleBackspace);
document.addEventListener("keydown", handleKeyboardInput);
