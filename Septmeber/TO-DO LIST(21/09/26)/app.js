// const todoForm = document.querySelector('.todo-form')
// const taskInput = document.querySelector('#taskInput')
// const taskList = document.querySelector('.task-list')
// const errorMessage = document.querySelector('.errorMessage')
// const empty = document.querySelector('.empty-message')

// const tasks = JSON.parse(localStorage.getItem('tasks')) || []

// function saveTasks() {
//     localStorage.setItem('tasks', JSON.stringify(tasks))
// }

// todoForm.addEventListener('submit', (event) => {
//     event.preventDefault()

//     const taskText = taskInput.value.trim()

//     if (taskText === "") {
//         errorMessage.textContent = 'Please enter a task'
//         return
//     }

//     errorMessage.textContent = ""
//     tasks.push(taskText)
//     saveTasks()
//     displayTask()
// })

// function displayTask() {
//     taskList.innerHTML = ""
//     empty.style.display = tasks.length === 0 ? 'block' : 'none'

//     tasks.forEach((task) => {
//         const li = document.createElement('li')
//         const span = document.createElement('span')
//         const checkbox = document.createElement('input')
//         checkbox.setAttribute('type', 'checkbox')

//         span.textContent = task
//         span.append(checkbox)
//         span.classList.add('space')

//         li.append(span)
//         taskList.append(li)
//     })

//     taskInput.value = ""
// }

// displayTask()
const todoForm = document.querySelector('.todo-form')
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('.task-list')
const errorMessage = document.querySelector('.errorMessage')
const empty = document.querySelector('.empty-message')
const progress = document.querySelector('#progress')
const progressLabel = document.querySelector('#progressLabel')
const progressBar = document.querySelector('#progressBar')
const todayDate = document.querySelector('#todayDate')

// Show today's date in the header
todayDate.textContent = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
})

// Each task is now an object: { text: "Buy bread", done: false }
// Tasks saved earlier were plain strings, so convert those too.
const saved = JSON.parse(localStorage.getItem('tasks')) || []
const tasks = saved.map(item =>
    typeof item === 'string' ? { text: item, done: false } : item
)

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const taskText = taskInput.value.trim()

    if (taskText === "") {
        errorMessage.textContent = 'Please enter a task'
        return
    }

    errorMessage.textContent = ""
    tasks.push({ text: taskText, done: false })
    saveTasks()
    displayTask(tasks.length - 1)   // pass the new task's index so it can animate in
    taskInput.focus()
})

function displayTask(newIndex = -1) {
    taskList.innerHTML = ""
    empty.style.display = tasks.length === 0 ? 'block' : 'none'

    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        li.classList.add('task-item')
        if (task.done) li.classList.add('done')
        if (index === newIndex) li.classList.add('is-new')

        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('aria-label', `Mark "${task.text}" as done`)
        checkbox.checked = task.done
        checkbox.addEventListener('change', () => {
            task.done = checkbox.checked
            li.classList.toggle('done', task.done)
            saveTasks()
            updateProgress()
        })

        const span = document.createElement('span')
        span.classList.add('task-text')
        span.textContent = task.text

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.setAttribute('type', 'button')
        deleteBtn.setAttribute('aria-label', `Delete "${task.text}"`)
        deleteBtn.textContent = '×'
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1)
            saveTasks()
            displayTask()
        })

        li.append(checkbox, span, deleteBtn)
        taskList.append(li)
    })

    taskInput.value = ""
    updateProgress()
}

function updateProgress() {
    const total = tasks.length
    const doneCount = tasks.filter(task => task.done).length
    const percent = total === 0 ? 0 : (doneCount / total) * 100

    progress.style.display = total === 0 ? 'none' : 'block'
    progressLabel.textContent = `${doneCount} of ${total} done`
    progressBar.style.width = `${percent}%`
}

displayTask()