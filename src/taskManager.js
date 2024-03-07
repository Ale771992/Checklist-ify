const connection = require('../server/server')
const date = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input')
const btnNewTask = document.querySelector('#addition')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let allTasks

//Date
const day = new Date()
date.innerHTML = day.toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day: 'numberic' })

// Funcion para agregar tarea a la base de datos
function addTaskDataBase(task, done, eliminated) {
    const query = 'INSERT INTO tareas (task, completed) VALUES (?, ?)';
  connection.query(query, [task, done], (error, results) => {
    if (error) throw error;
    const insertedId = results.insertId;
    console.log('Tarea agregada a la base de datos con ID:', insertedId);

    // Llamada a la función de retorno de llamada con el ID obtenido
    callback(insertedId);
  });
}

// Function to add a new task 
function addTask(task, id, done, eliminated) {
    if (eliminated) {
        return
    }
    const DONE = done ? check : uncheck
    const LINE = done ? lineThrough : ''

    const element = `<li id="element">
                     <i class="far ${DONE}" data="done" id="${id}"></i>
                     <p class="text ${LINE}">${task}</p>
                     <i class="fas fa-trash de" data="eliminated" id="${id}"></i>
                     </li>`
    list.insertAdjacentHTML("beforeend", element)
}
//Function to mark a task already donde 
function taskDone(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    allTasks[element.id].done = allTasks[element.id].done ? false : true

}
//Function for eliminated task
function eliminatedTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    allTasks[element.id].eliminated = true
    console.log(allTasks)
}
btnNewTask.addEventListener('click', () => {
    const task = input.value
    if (task) {
        addTaskDataBase(task, false, false)
        addTask(task, id, false, false)
        allTasks.push({
            name: task,
            id: id,
            done: false,
            eliminated: false
        })
    }
    localStorage.setItem('Checklist', JSON.stringify(allTasks))
    input.value = ''
    id++
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const task = input.value
        if (task) {
            addTask(task, id, false, false)
            allTasks.push({
                name: task,
                id: id,
                done: false,
                eliminated: false
            })
            console.log(allTasks)
        }
        localStorage.setItem('Checklist', JSON.stringify(allTasks))
        input.value = ''
        id++
    }
})

list.addEventListener('click', handleListClick)
function handleListClick(event) {
    const element = event.target
    const elementData = element.attributes.data.value
    if (elementData == 'done') {
        taskDone(element)
    }
    else if (elementData == 'eliminated') {
        eliminatedTask(element)
    }
    localStorage.setItem('Checklist', JSON.stringify(allTasks))
}

// Local storage get items 
let data = localStorage.getItem('Checklist')
if (data) {
    allTasks = JSON.parse(data)
    console.log(allTasks)
    id = allTasks.length
    loadList(allTasks)
} else {
    allTasks = []
    id = 0
}


function loadList(array) {
    array.forEach(function (item) {
        addTask(item.name, item.id, item.done, item.eliminated)
    })
}
