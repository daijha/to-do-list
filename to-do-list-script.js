document.addEventListener('DOMContentLoaded', () => {// allows the page to load before the script runs
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = taskValue;
        taskText.classList.add('task-text');
        li.appendChild(taskText);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completed';
        completeButton.classList.add('complete-button');
        completeButton.onclick = () => {
            taskText.classList.toggle('completed');
            saveTasks();
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = () => {
            editTask(editButton);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }
}

function editTask(button) {
    console.log('Edit button clicked')
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('.task-text');
    const newTaskText = prompt('Edit your task:', taskText.textContent);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskText.textContent = newTaskText.trim();
        saveTasks();
    }
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach((li) => {
        const taskText = li.querySelector('.task-text').textContent;
        const completed = li.querySelector('.task-text').classList.contains('completed');
        tasks.push({ text: taskText, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    tasks.forEach((task) => {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        if (task.completed) {
            taskText.classList.add('completed');
        }
        li.appendChild(taskText);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completed';
        completeButton.classList.add('complete-button');
        completeButton.onclick = () => {
            taskText.classList.toggle('completed');
            saveTasks();
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = () => {
            editTask(editButton);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}