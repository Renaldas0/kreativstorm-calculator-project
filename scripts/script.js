'use strict';

const clearBtn = document.querySelector('[data-clear]');
const backspaceBtn = document.querySelector('[data-backspace]');
const equalsBtn = document.querySelector('[data-equals]');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');

const previousText = document.querySelector('[data-previous]');
const currentText = document.querySelector('[data-current]');

let currentInput = "";

function displayValue(value) {
    currentInput += value;
    currentText.textContent = currentInput;
};

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        displayValue(value);
    });
});

function clearDisplay() {
    currentInput = "";
    previousText.textContent = '';
    currentText.textContent = '';
};

clearBtn.addEventListener('click', clearDisplay);

function backspace() {
    currentInput = currentInput.slice(0, -1);
    currentText.textContent = currentInput;
};

backspaceBtn.addEventListener('click', backspace);

function add(num1, num2) {
    let sum = num1 + num2;
    return sum;
};

function subtract(num1, num2) {
    let sum = num1 - num2;
    return sum;
};

function multiply(num1, num2) {
    let sum = num1 * num2;
    return sum;
};

function divide(num1, num2) {
    let sum = num1 / num2;
    return sum;
};

console.log(add(1, 2));
console.log(subtract(1, 2));
console.log(multiply(1, 2));
console.log(divide(1, 2));