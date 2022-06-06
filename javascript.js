// OPERATION FUNCTIONS

let firstNum;
let secondNum;
let resultNum;

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
}

// DIVISION
function divide(a, b) {
    let quotient = a / b;
    return quotient;
}


// OPERATE: TAKES AN OPERATOR AND TWO NUMBERS AND CALLS FUNCTION ABOVE
function operate(a, b) {
    const addition = add(a, b);
    const subtraction = subtract(a ,b);
    const multiplication = multiply(a, b);
    const division = divide(a, b);

    if (CONDITION) {
        return addition;
    }
    if (CONDITION) {
        return subtraction;
    }
    if (CONDITION) {
        return multiplication;
    }
    if (CONDITION) {
        return division;
    }
}