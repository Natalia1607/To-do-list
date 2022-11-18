/* https://jsonplaceholder.typicode.com */
let users = [];
let tasks = [];

Promise.all ([
    loadUsers(),
    loadTasks()
]).then((result) => {
    let [loadedUsers,loadedTasks] = result;
    users = loadedUsers;
    tasks = loadedTasks;
    updateDOMTasks();
    updateDOMUsers();
});

function updateDOMUsers() {
    let user_todo = document.querySelector('#user-todo');
    user_todo.innerHTML = '<option disabled selected>select user</option>';
    
    
    for (let i = 0; i < users.length; i++) {
        let currUser = users[i];

        let option = document.createElement('option');
        option.innerText = currUser.name;
        option.value = currUser.id;
        user_todo.appendChild(option);
    }
}

function updateDOMTasks() {
    let todo_list = document.querySelector('#todo-list');
    todo_list.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
        let currTask = tasks[i];
        let taskLi = document.createElement('li');
        taskLi.className = 'todo-item';

        let userName = users.find((user) => { 
            return user.id == currTask.userId 
        }).name;

        taskLi.innerHTML = `<input type="checkbox"><div>${currTask.title}</div><div style="font-style: italic">buy</div><div style="font-weight: 600">${userName}</div><div class="close": italic">Х</div>`;

        todo_list.appendChild(taskLi);
    }
}

async function loadUsers() {
    let response = await fetch('http://jsonplaceholder.typicode.com/users');
    let loadedUsers = await response.json();
    return loadedUsers;
}

async function loadTasks() {
    let response = await fetch('http://jsonplaceholder.typicode.com/todos');
    let loadedTasks = await response.json();
    return loadedTasks;
}

/* function loadUsers() {
    fetch('http://jsonplaceholder.typicode.com/users').then((response) => { //ассинхронная функция, так как возвращает Промисы нужно навешивать обработчики

    }); 
}
 */