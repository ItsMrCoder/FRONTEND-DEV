// let student = [
//     {
//         name:'Sola',
//         age:20,
//         course:'Javascript',
//         score:90,
//     },
//     {
//         name:'Gab',
//         age:12,
//         course:'Python',
//         score:45,
// }
// ]

// console.log( student[1]['name']);
// for (let i of students){
//     console.log(i['name'])
// }

// Object Destructuring 

// let student = {
//     name:'Sola',
//     age:20,
//     course:'Javascript',
//     score:90,
// };

// let {name,age,course,score} = 

// console.log(name)


let students = ['Sola','Gab','Kasia',]
let numbers = [1,2,3]
//Spread operator(...)
let newStudents = [...students, ...numbers]
console.log(newStudents);


let[w,x,y,z] = students

console.log(x)

//Rest operator(...) rest is only used in functions
// function add(a,b,c,d){
//     result = a*b*c*d
//     return result
// }

// console.log((add(12,1,3,5,10,20)))

//Arrow function

const add = (...numbers) => {
    let sum = 0
    for(let i of numbers){
        sum = sum + i
    }
    return sum
}
console.log(add(1,2,3,4,5,6,7,8,8))