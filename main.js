const button = document.querySelector("button");
const input = document.querySelector("input");
const form = document.querySelector("form");
const container = document.getElementById("container");

// Function to save data to localStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Function to load data from localStorage
function loadData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Load existing tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = loadData("tasks");
  container.innerHTML = savedTasks.join("");
});

container.addEventListener("click", (eo) => {
  if (eo.target.className == "icon-trash icon") {
    eo.target.parentElement.parentElement.remove();
    // Update localStorage after removing task
    saveTasksToLocalStorage();
  } else if (eo.target.className == "icon-angry2 icon") {
    eo.target.classList.add("dn");
    const heart = `<span class="icon-heart"></span>`;
    eo.target.parentElement.parentElement
      .getElementsByClassName("task-text")[0]
      .classList.add("finish");
    eo.target.parentElement.innerHTML += heart;
    // Update localStorage after completing task
    saveTasksToLocalStorage();
  } else if (eo.target.className == "icon-heart") {
    eo.target.parentElement.parentElement
      .getElementsByClassName("task-text")[0]
      .classList.remove("finish");
    eo.target.classList.add("dn");
    const addAngry = `<span class="icon-angry2 icon"> </span>`;
    eo.target.parentElement.innerHTML += addAngry;
    // Update localStorage after uncompleting task
    saveTasksToLocalStorage();
  } else if (eo.target.className == "icon-star icon") {
    eo.target.classList.add("green");
    container.prepend(eo.target.parentElement);
    // Update localStorage after prioritizing task
    saveTasksToLocalStorage();
  } else if (eo.target.className == "icon-star icon green") {
    eo.target.classList.remove("green");
    // Update localStorage after removing task priority
    saveTasksToLocalStorage();
  }
});

form.addEventListener("submit", (eo) => {
  eo.preventDefault();
  const taskText = input.value.trim(); // Trim removes leading/trailing whitespaces
  if (taskText !== "") {
    const task = `   
        <div class="task">
        <span class="icon-star icon"> </span>
        <p lang="ar" class="task-text">      ${taskText}     </p>
        <div>
            <span class="icon-trash icon"> </span>
            <span class="icon-angry2 icon"> </span>
        </div>
        </div>
        `;
    container.innerHTML += task;
    input.value = "";
    // Update localStorage after adding new task
    saveTasksToLocalStorage();
  } else {
    alert("Please enter a task before submitting.");
  }
});

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = Array.from(container.querySelectorAll(".task")).map(
    (task) => task.outerHTML,
  );
  saveData("tasks", tasks);
}
