// Select elements
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const priorityInput = document.getElementById("priority-input");
const addTaskButton = document.getElementById("add-task");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task when the "Add" button is clicked
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  const taskPriority = priorityInput.value;

  if (taskText !== "") {
    addTask(taskText, taskDate, taskPriority);
    saveTaskToLocalStorage(taskText, taskDate, taskPriority);

    // Clear input fields
    taskInput.value = "";
    dateInput.value = "";
    priorityInput.value = "Low";
  }
});

// Function to add a new task to the UI
function addTask(taskText, taskDate, taskPriority) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("todo-item");
  
  // Create task content
  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");
  taskDetails.innerHTML = `<strong>${taskText}</strong><br>Due: ${taskDate || "No date"}`;
  
  // Set priority
  const priorityLabel = document.createElement("span");
  priorityLabel.classList.add("task-priority");
  priorityLabel.textContent = taskPriority;
  
  if (taskPriority === "Low") priorityLabel.classList.add("priority-low");
  else if (taskPriority === "Medium") priorityLabel.classList.add("priority-medium");
  else if (taskPriority === "High") priorityLabel.classList.add("priority-high");
  
  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(taskItem);
    removeTaskFromLocalStorage(taskText);
  });
  
  // Append content, priority, and delete button to the task item
  taskItem.appendChild(taskDetails);
  taskItem.appendChild(priorityLabel);
  taskItem.appendChild(deleteButton);
  
  // Append the task item to the to-do list
  todoList.appendChild(taskItem);
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(taskText, taskDate, taskPriority) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, date: taskDate, priority: taskPriority });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text, task.date, task.priority);
  });
}

// Function to remove a task from localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Optional: add task on pressing Enter key
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTaskButton.click();
  }
});
