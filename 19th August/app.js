// let nameofperson = 'Gabriel'; // this value can be changed when you use let

// const x = 5; // it can't be changed afterward

// console.log(x)

// let admin = false
// console.log(typeof admin)

// let selecteduser = null;
// console.log(typeof selecteduser)// type of is used to know the data type.

// let username; //undefined


// let number = parseFloat(prompt('Enter your number: ')) //parseFloat is used to convert string to float; parseInt is used to convert string to int
// if (number>0){
//     console.log(number, 'is a positive number');
//     console.log(`${number}, is a positive number`);
// }else{

// }


//- * ** / %
// > < >= <= === !==
// && = and, || = or, ! = not



// //create a simple calculator with javascript
// const num1 = 5
// const num2 = 10
// const num3 = num1 + num2
// console.log('Num 3 is', num3)

// const num4 = num1 * num3
// console.log(num4)

// const num5 = num4/num3
// console.log(num5)

// const num6 = num4 - num3
// console.log(num6)

// const value = ((num5 + num4) - num2 + num1)*num2
// console.log(value)

// const mod = 15%3
// console.log(mod)

// // create a bmi 




// let score = parseFloat(prompt('Enter your score:'))
// if(score>=70){
//     console.log('A');
// }else if(score>=60){
//     console.log('B');
// }else if(score>=50){
//     console.log('C');
// }else if(score>=40){
//     console.log('D');
// }else{
//     console.log('F')
// }

let leapyear = parseInt(prompt('Enter a number: '))

let answer = leapyear % 4 == 0 ? 'Leap year' : 'Not a leapyear'

console.log(answer)