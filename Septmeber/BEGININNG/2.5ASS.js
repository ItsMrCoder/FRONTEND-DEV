// 🌐 JAVASCRIPT:
// Create an array containing the paths to 5 different pictures.
// Use a button to change the pictures in this order: 1 → 2 → 3 → 4 → 5 → back to 1.
// Use setInterval() to automatically change the picture every 5 seconds.

let pictures = [
    "images/item-1.png",
    "images/item-2.png",
    "images/item-3.png",
    "images/item-4.png",
    "images/item-5.png",
];

let colors = ['blue', 'red', 'green', 'yellow', 'orange'];



let currentPicture = 0;

let body = document.body;
let picture = document.getElementById("picture");
let nextBtn = document.getElementById("nextBtn");


function changePicture() {
    currentPicture += 1;
    body.style.backgroundColor = colors[currentPicture];
    
    if (currentPicture == pictures.length) {
        currentPicture = 0;
    }

    picture.src = pictures[currentPicture];
}

nextBtn.addEventListener("click", changePicture);

setInterval(changePicture, 5000);



// let message = document.querySelector(".message");
// let messages = ['Welcome to my website!', 'Enjoy your stay!', 'Check out our latest updates!', 'Feel free to explore!', 'Contact us for more information!'];

// let btn = document.querySelector(".btn");
// let index = 0

// btn.addEventListener("click", () => {
//     message.textContent = messages[index]
//     index += 1
//     if (index == messages.length) {
//         index = 0
//     }
// })

// setInterval(() => {
//     message.textContent = "Welcome to my website!";
// }, 5000);


// Create a counter manually using a button to increase the count by 1 and display it on the screen. Do it manually increase the count by 1 every 5 seconds.
// There should be a button to reset the count back to 0.
// When the number is positive the counter should be green, when it is negative it should be red, and when it is 0 it should be black.