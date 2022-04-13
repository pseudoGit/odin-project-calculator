function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'ERROR';
    }
    else {
        return a / b;
    }
}

function operate(operator, a, b){
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "ERROR";
    }
}

const output = document.querySelector('#display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
let digitA = "", digitB = "", operation;
let evaluated = false;

/*
 * If a user clicks a digit, add it to the existing display.
 * If a user clicks a digit after evaluating an expression,
 * replace the display with the new input.
 */
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        if (evaluated) {
            digitA = digit.textContent;
            output.textContent = digitA;
            evaluated = false;
        }
        else {
            digitA += digit.textContent;
            output.textContent += digit.textContent;
        }
    });
});

/*
 * Append the operation to the display and save the first 
 * value. If a user clicks an operation after evaluating 
 * an expression, set the evaluated flag to false to allow
 * digits to be appended to the existing display.
 */
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        operation = operator.textContent;
        output.textContent += operation;
        digitB = digitA;
        digitA = "";
        if (evaluated) {
            evaluated = false;
        }
    });
});

/*
 * Evaluate the expression and store the result as
 * the first value for the next expression.
 */
equals.addEventListener('click', () => {
    digitA = operate(operation, +digitB, +digitA);
    output.textContent = digitA;
    evaluated = true;
});

/*
 * Clear the display and any stored values.
 */
clear.addEventListener('click', () => {
    output.textContent = "";
    digitA = "";
    digitB = "";
    operation = "";
    evaluated = false;
});