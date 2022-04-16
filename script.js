const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNum, secondNum) => firstNum / secondNum,
    '*': (firstNum, secondNum) => firstNum * secondNum,
    '+': (firstNum, secondNum) => firstNum + secondNum,
    '-': (firstNum, secondNum) => firstNum - secondNum,
    '=': (firstNum, secondNum) => secondNum
};

let firstValue = 0;
let operatorValue = 0;
let awaitingNextValue = false;
let negativeValue = false;

function sendNumberValue (number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = 
            displayValue === "0" 
                ? number 
                : displayValue + number;
    }
}

function addDecimal(inputBtn) {
    // If operator pressed, don't add decimal
    if (operatorValue) {
        awaitingNextValue = true;
        sendNumberValue(inputBtn.value);
    }

    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        sendNumberValue(inputBtn.value);
    } 
}

// Reset display
function resetAll() {
    firstValue = 0;
    operatorValue = 0;
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }

    // Assign firstValue is no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        firstValue = calculation;
        negativeValue = false;
        calculatorDisplay.textContent = calculation;
    }

    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Toggle between postive and negative value
function toggleNegative() {
    let displayValue = calculatorDisplay.textContent;
    
    if (displayValue == 0) return;

    negativeValue = !negativeValue;
    if (negativeValue) {
        displayValue = `-${displayValue}`;
    } else {
        displayValue = Math.abs(displayValue);
    }

    calculatorDisplay.textContent = displayValue;
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach(inputBtn => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } 
    
    if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } 
    
    if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal(inputBtn));
    } 

    if (inputBtn.classList.contains('clear')) {
        inputBtn.addEventListener('click', resetAll);
    } 

    if (inputBtn.classList.contains('negative')) {
        inputBtn.addEventListener('click', toggleNegative);
    } 
});