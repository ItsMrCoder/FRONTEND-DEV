let numbers = [1,4,6,9,8,10,3];
let double = numbers.map(num => num * 2)
console.log(double);

const ten = numbers.map(x=>x+10)
console.log(ten)

let fahrenheit = numbers.map(y=>((y*9/5)+32))
console.log(fahrenheit)

// filter

let even = numbers.filter(a => a % 2 === 0)
console.log(even);

let greater = numbers.filter( a => a > 2)
console.log(greater)

//reduce---- your bringing it down to one number

let total = numbers.reduce((sum, num)=>{
    return num + sum
})
console.log(total);

