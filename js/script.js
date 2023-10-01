// Function to retrieve tasks from local storage
function getTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    return JSON.parse(tasksJSON) || [];
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>${task}</div>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();

    if (newTask !== '') {
        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);
        taskInput.value = '';
        renderTasks();
    }
}

// Function to edit a task
function editTask(index) {
    const tasks = getTasks();
    const updatedTask = prompt('Edit the task:', tasks[index]);

    if (updatedTask !== null) {
        tasks[index] = updatedTask;
        saveTasks(tasks);
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

// Initial rendering of tasks
renderTasks();
