// Tasks the  List
// Use some event listner
// Add funtionality to the lietner

// UI handling

// Data Logic

const textInput = document.getElementById("display");
const activeBtn = document.querySelector(".active-list");
const completeBtn = document.querySelector(".completed-list");
const allBtn = document.querySelector(".all-list");
const clearBtn = document.querySelector(".clear-list");
const filterTab = document.querySelectorAll(".tab");

// const activeCountElement = document.getElementById(".activeCount");

let tasks = [];
textInput.value = "";
category = "All";
// { id: 1, content: "Task1", status: "Active" },
// { id: 2, content: "Task2", status: "Completed" },
// { id: 3, content: "Task3", status: "Active" },

// Logic of handling tasks
// Implement a function to fetch tasks
function getTask(category1) {
  if (category1 === "All") {
    return tasks;
  } else {
    return tasks.filter((item) => item.status === category1);
  }
}

// Implement a function to add task
function addTask(content, new_id) {
  new_id = tasks.length + 1;
  new_Tasks = { id: new_id, content: content, status: "Active" };
  tasks.unshift(new_Tasks);
  console.log(tasks);
  renderTasks(tasks);
  uncompletedCount();
}

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (textInput.value === "") {
      alert("Enter Something.");
    } else {
      addTask(textInput.value);
      console.log({ textInput, e });
      e.target.value = "";
    }
  }
});

//  addTask("Welcome");
//  console.log(Tasks);

// Implement a function to delete task
function deleteTask() {
  const { index } = event.target.dataset;
  tasks.splice(index, 1);
  renderTasks(tasks);
  uncompletedCount();
}

function renderTasks() {
  const allCatergoryTasks = getTask("All");
  const activeCatergoryTasks = getTask("Active");
  const completedCatergoryTasks = getTask("Completed");

  // const checkedAtribute = item.status ? 'checked' : "";

  const list = document.querySelector(".list");
  list.innerHTML = "";
  tasks.forEach((item, index) => {
    let decoration = "none";
    let ischecked = "unchecked";
    if (item.status === "Completed") {
      console.log(item);
      decoration = "line-through";
      ischecked = "checked";
    }
    let listItem = document.createElement("li");
    listItem.innerHTML = `<div class="innerDiv" style = "display:flex">
                      <input type = "checkbox" id="checkbox-${index}" ${ischecked} class="check-box">
                      <li><label style="text-decoration: ${decoration};" class="item-label">${item.content}</label></li>
                      <button class = "delete" onclick = "deleteTask()" data-index=${index}>X</button> 
                  </div> `;
    list.appendChild(listItem);

    const checkbox = listItem.querySelector(`#checkbox-${index}`);

    checkbox.addEventListener("change", (e) => {
      if (checkbox.checked) {
        listItem.style.textDecoration = "line-through";
        completeTask(index);
      } else {
        listItem.style.textDecoration = "none";
        unCompleteTask(index);
      }
    });
  });
  uncompletedCount();
  updateCurrentTab();
}

function updateCurrentTab() {
  filterTab.forEach((filterNode) => {
    const { filter } = filterNode.dataset;

    if (category === filter) {
      filterNode.classList.add("selected-border");
    } else {
      filterNode.classList.remove("selected-border");
    }
  });
}

function completeTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (i == id) {
      tasks[i].status = "Completed";
    }
  }
  renderTasks();
  // console.log(tasks);
}
// console.log(tasks);
function unCompleteTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (i == id) {
      tasks[i].status = "Active";
    }
  }
}

//get uncompleted task count
function uncompletedCount() {
  const count = tasks.filter((task) => task.status === "Active").length;
  document.querySelector(".item-left-list").textContent = `${count} items left`;
}

activeBtn.addEventListener("click", (e) => {
  // console.log("inside active");
  // console.log(tasks);
  let temp = tasks;
  category = "Active";
  tasks = tasks.filter((task) => task.status == "Active");
  renderTasks();
  tasks = temp;
  // updateActiveCount();
  uncompletedCount();
});

completeBtn.addEventListener("click", (e) => {
  let temp = tasks;
  category = "Completed";
  tasks = tasks.filter((task) => task.status == "Completed");
  renderTasks();
  tasks = temp;
  uncompletedCount();
});

allBtn.addEventListener("click", (e) => {
  // console.log("inside all btn fn");
  category = "All";
  renderTasks();
  uncompletedCount();
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((tasks) => tasks.status === "Active");
  renderTasks();
  uncompletedCount();
});

// function updateActiveCount(){
//   const activeCount = tasks.filter(content => !content.status).length;
//   activeCountElement.textContent = activeCount;
// }

// updateActiveCount();
