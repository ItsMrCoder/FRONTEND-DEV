let weight = Number(prompt("Enter your weight in kg:"));
let height = Number(prompt("Enter your height in meters:"));

let bmi = weight / (height * height);

let category;

if (bmi < 18.5) {
    category = "Underweight";
} else if (bmi < 25) {
    category = "Normal weight";
} else if (bmi < 30) {
    category = "Overweight";
} else {
    category = "Obesity";
}

console.log("Your BMI is " + bmi);
console.log("Category: " + category);