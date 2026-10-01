let count = 0;

let addBtn = document.querySelector('.add');

addBtn.addEventListener('click', ()=>{
    count += 1 
    console.log(count)
});

let SubBtn = document.querySelector('.sub');
SubBtn.addEventListener('click', ()=>{
    count -= 1 
    console.log(count)
});

let resetBtn = document.querySelector('.reset')
resetBtn.addEventListener('click', ()=>{
    count = 0
    console.log(count)
});

btn.addEventListener('click', () => {
    count += 0
    Number.textContent= count
    Number.style.color = 'green'
})    

