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

let currentPicture = 0;

let picture = document.getElementById("picture");
let nextBtn = document.getElementById("nextBtn");


function changePicture() {
    currentPicture += 1;

    if (currentPicture == pictures.length) {
        currentPicture = 0;
    }

    picture.src = pictures[currentPicture];
}

nextBtn.addEventListener("click", changePicture);

setInterval(changePicture, 5000);