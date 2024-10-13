document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load tasks from localStorage or initialize empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load existing tasks from localStorage when the page loads
    function loadTasks() {
        tasks.forEach(task => addTask(task, false)); // Do not save to localStorage again
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        const trimmedTaskText = taskText.trim();
        
        // Check if taskText is not empty
        if (trimmedTaskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = trimmedTaskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Assign onclick event to remove button
        removeButton.onclick = () => {
            li.remove(); // Remove the task from the DOM
            if (save) {
                tasks = tasks.filter(task => task !== trimmedTaskText); // Update tasks array
                updateLocalStorage(); // Update localStorage
            }
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);
        // Append the list item to the task list
        taskList.appendChild(li);

        // Save to localStorage if specified
        if (save) {
            tasks.push(trimmedTaskText); // Add task to tasks array
            updateLocalStorage(); // Update localStorage
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to localStorage
    }

    // Attach event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value)); // Add task on button click
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Add task on Enter key press
        }
    });

    // Load tasks on page load
    loadTasks();
});