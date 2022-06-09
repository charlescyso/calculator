// ADDITION
function add(a, b) {
    let sum = a + b;
    return sum;
}

// SUBTRACTION
function subtract(a, b) {
    let difference = a - b;
    return difference;
}

// MULTIPLICATION
function multiply(a, b) {
    let product = a * b;
    return product;
}

// DIVISION
function divide(a, b) {
    let quotient = a / b;
    return quotient;
}

// OPERATE: TAKES AN OPERATOR AND TWO NUMBERS AND CALLS FUNCTION ABOVE AND RETURNS RESULT
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

//DECLARE LET VARIABLES
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let checkResetScreen = false;

// DECLARE CONST VARIABLES
const displayScreen = document.querySelector('#displayScreen');
const numberButtons = document.querySelectorAll('[data-number]');
const pointButton = document.querySelector('#pointBtn');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#equalsBtn');
const clearButton = document.querySelector('#clearBtn');
const deleteButton = document.querySelector('#deleteBtn');

// Event listeners on buttons
numberButtons.forEach(number => number.addEventListener('click', () => appendNumber(number.textContent)));
operatorButtons.forEach(operator => operator.addEventListener('click', () => setOperation(operator.textContent)));
pointButton.addEventListener('click', appendPoint)
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
window.addEventListener('keydown', keyboardInput);

function appendNumber(number) { // Appends number on the display screen
    if (displayScreen.textContent === '0' || checkResetScreen) { // If there's a 0 or checkResetScreen is true, reset the screen
        resetScreen();
    }
    displayScreen.textContent += number;
}

function resetScreen() { // Resets the screen (clears it)
    displayScreen.textContent = '';
    checkResetScreen = false;
}

function clear() { // Resets the screen to '0' and clears saved operands and operator
    displayScreen.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}


function appendPoint() { // Appends a single decimal to display screen
    if (checkResetScreen) { // If checkResetScreen is true, reset the screen
        resetScreen();
    }
    if (displayScreen.textContent === '') { // If display screen is empty, add a '0' before decimal
        displayScreen.textContent = '0';
    }
    if (displayScreen.textContent.includes('.')) { // If display screen already has decimal, ignore user input
        return
    }
    displayScreen.textContent += '.'
  }

function deleteNumber() {
    if (checkResetScreen === true) { // If checkResetScreen is true, clear the display screen and operands and operator
        clear();
    }   else {
        displayScreen.textContent = displayScreen.textContent.toString().slice(0, -1); // Deletes single character at end of string
        }
}

function setOperation(operator) { // Sets the operator to user input
    if (currentOperation !== null) { // If an operator is already set, evaluate the equation first and return it
        evaluate();
    }
    firstOperand = displayScreen.textContent; // Set first operator to current display
    currentOperation = operator; // Set operator as clicked operator
    checkResetScreen = true; // Set checkResetScreen to true, ready for next user input
}

function evaluate() {
    if (currentOperation === null || checkResetScreen) { // If there is no operator set or checkResetScreen is true, don't do anything
        return;
    }
    secondOperand = displayScreen.textContent; // Set second operator to display screen
    displayScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand)); // Set the display screen to the rounded result of equation after taking in the operator, first and second operand
    currentOperation = null; // Set current operation to null
    checkResetScreen = true; // Set checkResetScreen to true, ready for next user input
}

function roundResult(number) { // Rounds number to nearest thousandths
    return Math.round(number * 1000) / 1000
    }

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key);
    }
    if (e.key === '.') {
        appendPoint();
    }
    if (e.key === '=' || e.key === 'Enter') {
        evaluate();
    }
    if (e.key === 'Backspace') {
        deleteNumber();
    }
    if (e.key === 'Escape') {
        clear();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(e.key);
    }
}

// // DECLARE LET VARIABLES
// let clearZero = 1; // IF 1, CLEARS displayScreen; IF 0, DOESN'T CLEAR displayScreen
// let displayValue; // VALUE OF displayScreen AT ANY TIME
// let operatorMode = 'none'; // '+', '-', '*', '/', 'none'
// let tempValue; // USED FOR FIRST OPERAND
// let tempValue2; // USED FOR SECOND OPERAND






// // EVENT LISTENERS ON NUMBER BUTTONS TO POPULATE displayScreen AND UPDATE displayValue
// numberButtons.forEach(e => e.addEventListener('click', appendNumber)); // APPENDS NUMBERS TO displayValue
// numberButtons.forEach(e => e.addEventListener('click', updateDisplayValue)); // UPDATES displayValue
// numberButtons.forEach(e => e.addEventListener('click', updateTempValue)); // UPDATES tempValue
// numberButtons.forEach(e => e.addEventListener('click', log)); // helps me see everything I did right or wrong lol

// // FUNCTION TO APPEND CLICKED NUMBER ONTO displayScreen
// function appendNumber(e) {
//     if (clearZero === 1) { // CLEARS displayScreen IF clearZero is 1
//         displayScreen.innerText = '';
//         clearZero = 0;
//     }
//     displayScreen.innerText += e.target.innerText; // APPENDS NUMBERS TO displayScreen
// }

// // FUNCTION TO UPDATE displayValue ANY TIME A NUMBER IS CLICKED
// function updateDisplayValue() {
//     displayValue = Number(displayScreen.innerText);
// }

// // FUNCTION TO UPDATE tempValue or tempValue DEPENDING IF OPERATOR MODE TRUE/FALSE
// function updateTempValue() {
//     if (operatorMode === '+' || operatorMode === '-' || operatorMode === '*' || operatorMode === '/') {
//         tempValue2 = displayValue;
//     }
//     if (operatorMode === 'none') {
//         tempValue = displayValue;
//     }
// }




// // EVENT LISTENERS ON OPERATOR BUTTONS TO CHANGE MODE AND CALCULATE IF NEEDED
// operatorButtons.forEach(e => e.addEventListener('click', changeMode));
// operatorButtons.forEach(e => e.addEventListener('click', log)); // helps me debug lol
// // operatorButtons.forEach(e => e.addEventListener('click', saveDisplayValue));

// // FUNCTION TO CHANGE MODE AND CLEAR DISPLAY IF NEEDED
// function changeMode(e) {
//     if (operatorMode === '+' || operatorMode === '-' || operatorMode === '*' || operatorMode === '/') {
//         displayScreen.innerText = String(operate(tempValue, tempValue2));
//         updateDisplayValue();
//         tempValue = displayValue;
//         operatorMode = 'none';
//     }
//     operatorMode = e.target.innerText;
//     clearZero = 1;
// }

// // FUNCTION TO SAVE DISPLAY VALUE TO tempValue;
// // function saveDisplayValue() {
// //     tempValue = displayValue;
// // }



// // EVENT LISTENER TO RUN OPERATE FUNCTION
// // equalsButton.addEventListener('click', equalsFunc);

// // FUNCTION TO CALCULATE USING OPERATE FUNCTION
// // function calculate() {
// //     let temp = displayValue;

// //     displayValue = (operate(tempValue, displayValue)); // SET DISPLAY VALUE TO RESULT
// //     displayScreen.innerText = displayValue; // SET DISPLAY SCREEN TO RESULT

// //     tempValue = displayValue; // SETS TEMP VALUE TO DISPLAY VALUE
// //     displayValue = temp; // SETS DISPLAY VALUE TO INITIAL DISPLAY VALUE
// //     clearZero = 1;
// // }

// function log() {
//     console.log(`displayValue = ${displayValue}`);
//     console.log(`tempValue = ${tempValue}`);
//     console.log(`tempValue2 = ${tempValue2}`);
//     console.log(`operatorMode = ${operatorMode}`);
//     console.log('///////////////////////////////')
// }