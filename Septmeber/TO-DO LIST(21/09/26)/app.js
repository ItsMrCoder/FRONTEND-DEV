const todoForm = document.querySelector('.todo-form')

const todoInput = document.querySelector('#xtaskInput')

const taskList = document.querySelector('.task-list')

const errorMessage = document.querySelector('.errorMessage')

const empty = document.querySelector('.empty-message')

const tasks = [];

todoSubmit = document.addEventListener('submit', () =>{
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === ""){
        errorMessage.textContent = 'Please enter a task'
        return;
    }
    errorMessage.textContent = ""
    tasks.push(taskText)
    
    if (tasks.length === 0){
        empty.style.display = 'block'
    }else{
        empty.style.display = 'none'
    }
    displayTask()
})

function displayTask(){
    taskList.innerHTML = ""
    tasks.forEach((task,index)=>{
        const li = document.createElement('li');
        const span = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        span.textContent = task
        span.append(checkbox)

        span.classList.add('space')

        li.append(span)
        taskList.append(li)
    })
    taskInput.value = ""
}

// ASSIGNMENTS

// when u refresh your page, all your task u saved will be deleted, i want u to research on local storage so that when the page is being refreshed the task would not be deleted
// digital clock