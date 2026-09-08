//while
//for
//do while


// for(let i = 5; i >= 0; i--){
//     console.log(i)
// }

// let names = ['Kachi', 'Konsa', 'Messi', 'Sola']
// for (let i of names){
//     console.log(i)
// }


let students = {
    name: 'Sola',
    age: 30,
    department: 'ICE',
    state_of_origin: 'Isin'
}
// console.log(students['name'])

for (let i of students){
    console.log(i, students[i])
}


let numbers = [1,2,3,4]
numbers.forEach(num => {
    let result = num * 2
    console.log(result)
})

let names = ['Kachi', 'Konsa', 'Messi', 'Sola', 'Fola', 'Kemi', 'Tomi', 'John', 'Patrick']

names.forEach(element => {
    if(element.length > 5) {
        console.log(element);
    }
    
})

numbers.forEach(num => {
    //let result = num * 2
    // console.log(result); 
    if (num % 2 == 0){
        console.log(num)
    }
})


//find highest score, average, total, lowest score, cutoff-mark = 60.. get the amount of people that passed

let scores = [45,78,92,67,88,55,99]


scores.forEach(numms => {
    if(numms>=99){
        console.log(numms)
    }
})