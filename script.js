document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('new-task-form');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTaskAction);

    loadTasks();

    function addTask(event) {
        event.preventDefault();
        const title = document.getElementById('task-title').value;
        const desc = document.getElementById('task-desc').value;
        const priority = document.getElementById('task-priority').value;
        const deadline = document.getElementById('task-deadline').value;

        const task = {
            id: Date.now(),
            title,
            desc,
            priority,
            deadline,
            completed: false
        };

        saveTask(task);
        appendTask(task);
        taskForm.reset();
    }

    function handleTaskAction(event) {
        const { target } = event;
        if (target.tagName.toLowerCase() === 'button') {
            const action = target.dataset.action;
            const taskId = target.closest('li').dataset.id;

            if (action === 'complete') {
                toggleTaskCompletion(taskId);
            } else if (action === 'delete') {
                deleteTask(taskId);
            }
        }
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => appendTask(task));
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function saveTask(task) {
        const tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function appendTask(task) {
        const taskItem = document.createElement('li');
        taskItem.className = priority-${task.priority};
        taskItem.dataset.id = task.id;
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <div class="task-details">
                <strong>${task.title}</strong>
                <p>${task.desc}</p>
                <span>Due: ${task.deadline}</span>
            </div>
            <div class="task-actions">
                <button data-action="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                <button data-action="delete">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    }

    function toggleTaskCompletion(taskId) {
        const tasks = getTasks();
        const task = tasks.find(task => task.id == taskId);
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskList();
    }

    function deleteTask(taskId) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskList();
    }

    function refreshTaskList() {
        taskList.innerHTML = '';
        loadTasks();
    }
});
