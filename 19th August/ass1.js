let num1 = Number(prompt("Enter the first number:"));
let operator = prompt("Enter +, -, * or /:");
let num2 = Number(prompt("Enter the second number:"));

let result;

if (operator === "+") {
    result = num1 + num2;
} else if (operator === "-") {
    result = num1 - num2;
} else if (operator === "*") {
    result = num1 * num2;
} else if (operator === "/") {
    result = num1 / num2;
} else {
    result = "Invalid operator";
}

console.log("Result: " + result);