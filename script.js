let pendingList = document.getElementById("pendingList");
let completedList = document.getElementById("completedList");

function saveData() {
  localStorage.setItem("pending", pendingList.innerHTML);
  localStorage.setItem("completed", completedList.innerHTML);
}

function loadData() {
  pendingList.innerHTML = localStorage.getItem("pending") || "";
  completedList.innerHTML = localStorage.getItem("completed") || "";
}

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (!text) return;

  let task = createTask(text);
  pendingList.appendChild(task);

  input.value = "";
  saveData();
}

function createTask(text) {
  let div = document.createElement("div");
  div.className = "task-card";

  div.innerHTML = `
    <span>${text}</span>
    <div class="task-buttons">
      <button onclick="completeTask(this)">✔</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;

  return div;
}

function completeTask(btn) {
  let task = btn.closest(".task-card");
  task.classList.add("completed");

  btn.parentElement.remove();

  completedList.appendChild(task);
  saveData();
}

function deleteTask(btn) {
  let task = btn.closest(".task-card");
  task.remove();
  saveData();
}

loadData();

const completedTasks = tasks.filter(t => t.completed).length;
const totalTasks = tasks.length;
const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

function updateProgress() {
  const allTasks = document.querySelectorAll(".task-card");
  const completedTasks = document.querySelectorAll(".task-card.completed");

  const total = allTasks.length;
  const completed = completedTasks.length;

  const percent = total === 0 ? 0 : (completed / total) * 100;

  document.getElementById("progress-fill").style.width = percent + "%";
  document.getElementById("progress-text").innerText =
    `${completed} / ${total} tasks completed`;
}

const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});