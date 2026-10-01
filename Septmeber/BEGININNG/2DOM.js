let image = document.querySelectorAll('img')

image.setAttribute('src', "./solutions5.png")

let btn = document.querySelector('button');

// btn.addEventListener('click', function(e){
//     if (image.getAttribute('src') === "./solutions5.png"){
//         image.setAttribute('src', "./solutions6.png")
//     }else{
//         image.setAttribute('src', "./solutions5.png")
//     }
// })
btn.addEventListener('click', function(e){
    image.src.includes("./solutions5.png")? "./solutions6.png": "./solutions5.png"
})

// So i want you guys to use Setinterval to change the pictures at every 5 seconds.
//Create an array and put a path to 5 different picture, i want it to move 1,2,3,4,5 then back to the beginneing, i wnant=u to use a button to do it and also get a setinterval.