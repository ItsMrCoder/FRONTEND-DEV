// // Selects all <h2> elements in the document and returns a NodeList
let x = document.querySelector('h1');

// // Selects the first element imn the document that matches the CSS selector "#gab"
let z = document.querySelector('#gab');// if it is a class ".gab"

// // Selects the element wih the ID "gab" directly via the DOM(faster than querySelector)
let y = document.getElementById('gab')

// document.getElementsByTagName
// document.getElementsByClassName


// let moses = document.querySelector('.moses');
// moses.textContent = 'Sola';


let btn = document.querySelector('button');
btn.addEventListener('click', function(e){
    //e.target.textContent = 'Hello'
    if(moses.textContent === 'Moses'){
        moses.textContent = 'Sola'    
    }else{
        moses.textContent = 'Moses'
    }
})

innerHTML 