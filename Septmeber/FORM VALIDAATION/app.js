let form = document.querySelector('.registerform');
let name = document.querySelector('#name');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let dob = document.querySelector('#dob');

let passwordError = document.querySelector('#passwordError')
let nameError = document.querySelector('#nameError')
let emailError = document.querySelector('#emailError')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    let nameValue = name.value.trim()
    let emailValue = email.value.trim()
    let passwordValue = password.value.trim()
    let dobValue = dob.value.trim()

    if(passwordValue.length < 8){
        passwordError.textContent = 'Password must be greater than 8 characters'
    }else{
        passwordError.textContent = ""
    }

    if(nameValue === ""){
        nameError.textContent = 'Name is required'
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailValue)){
        emailError.textContent = 'Please a valid email'
    }
})