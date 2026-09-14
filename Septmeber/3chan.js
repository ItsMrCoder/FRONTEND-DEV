// Changing apperance in CSS using JS
let btn = document.querySelector('.btn');
let body = document.body; 

// btn.addEventListener('click', (e) => {
//     body.classList.toggle('dark');
// });
// Change the text of the button to "Light Mode" when the dark mode is on, and "Dark Mode" when the dark mode is off.
// btn.addEventListener('click', (e) => {
//     if (body.classList.toggle('dark')) {
//         btn.textContent = 'Light Mode';
//     } else {
//         btn.textContent = 'Dark Mode';
//     }
// });
// // // Change the color of the button to white when the dark mode is on, and black when the dark mode is off.
// btn.addEventListener('click', (e) => {
//     if (body.classList.contains('dark')) {
//         btn.style.color = 'white';
//     } else {
//         btn.style.color = 'black';
//     }
// });

btn.addEventListener('click', (e) => {
    if (e.target.textContent === 'Dark Mode') {
        e.target.textContent = 'Light Mode';

    }else{
        e.target.textContent = 'Dark Mode';
    }    

    body.classList.toggle('dark')
})
