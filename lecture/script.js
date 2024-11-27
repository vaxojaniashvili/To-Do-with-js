const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskButton.addEventListener("click", () => {
  let text = taskInput.value;
  if (text.length > 0) {
    let mainDiv = document.createElement("div");
    const newTask = {
      text: text,
      time: new Date().toLocaleTimeString(),
      completed: false,
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    mainDiv.style.display = "flex";
    mainDiv.style.justifyContent = "space-between";

    let textP = document.createElement("p");
    textP.textContent = newTask.text;
    let timeP = document.createElement("p");
    timeP.textContent = newTask.time;

    let checkbox = document.createElement("input");
    let removeButton = document.createElement("button");

    removeButton.textContent = "delete";
    checkbox.type = "checkbox";

    mainDiv.appendChild(textP);
    mainDiv.appendChild(timeP);
    mainDiv.appendChild(checkbox);
    mainDiv.appendChild(removeButton);
    taskList.appendChild(mainDiv);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        textP.style.textDecoration = "line-through";
      } else {
        textP.style.textDecoration = "none";
      }
    });

    removeButton.addEventListener("click", () => {
      mainDiv.remove();
    });
    taskInput.value = "";
  } else {
    alert("შეიყვანე რამე რა ");
  }
});

function loadTasks() {
  tasks.forEach((taskItem) => {
    let mainDiv = document.createElement("div");
    mainDiv.style.display = "flex";
    mainDiv.style.justifyContent = "space-between";
    taskList.appendChild(mainDiv);

    let taskParagraph = document.createElement("p");
    taskParagraph.textContent = taskItem.text;
    if (taskItem.completed) {
      taskParagraph.style.textDecoration = "line-through";
    }

    let timeParagraph = document.createElement("p");
    timeParagraph.textContent = taskItem.time;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskItem.completed;

    let removeButton = document.createElement("button");
    removeButton.textContent = "delete";

    mainDiv.appendChild(taskParagraph);
    mainDiv.appendChild(timeParagraph);
    mainDiv.appendChild(checkbox);
    mainDiv.appendChild(removeButton);

    checkbox.addEventListener("change", () => {
      taskItem.completed = checkbox.checked;
      taskParagraph.style.textDecoration = checkbox.checked
        ? "line-through"
        : "none";
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    removeButton.addEventListener("click", () => {
      tasks = tasks.filter((task) => task.text !== taskItem.text);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      mainDiv.remove();
    });
  });
}
loadTasks();
