let i = 0;

while(i <= 5){
    console.log(i);
    i++
}

let password = prompt('Enter your password: ')
let savePassword = '1234'
while(password !== savePassword){
    console.log('Try Again')
    let password = prompt('Enter your password: ')
}

console.log('Acess granted');

for (let i = 0; i <= 5; i++) {
    if (i === 3){
        break
    }
    console.log(i);
}

    

let a = 0;
do{
    console.log(a);
}while (i>1){
    i--
}