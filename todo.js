let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveButton");

saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  saveTodoButton.textContent = "saved";
};
function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);

  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}
let todoList = getTodoListFromLocalStorage();
let count = todoList.length;
function onTodoStatusChanged(checkboxId, labelId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);

  labelElement.classList.toggle("checked");
}
function onToDoDelete(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);
}
function createAndAppendTodo(todo) {
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;

  let listElement = document.createElement("li");
  listElement.classList.add("todo-item-container", "d-flex", "flex-row");
  listElement.id = todoId;
  todoItemsContainer.appendChild(listElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.classList.add("checkbox-input");
  listElement.appendChild(inputElement);
  inputElement.onclick = function () {
    onTodoStatusChanged(checkboxId, labelId);
  };

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  listElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.setAttribute("for", checkboxId);

  let deleteContainer = document.createElement("div");
  deleteContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function () {
    onToDoDelete(todoId);
  };
  deleteContainer.appendChild(deleteIcon);
}

function onAddToDo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputvalue = userInputElement.value;
  if (userInputvalue === "") {
    alert("Enter Valid Text");
    return;
  }
  count = count + 1;
  let addTodo = {
    text: userInputvalue,
    uniqueNo: count,
  };
  todoList.push(addTodo);

  createAndAppendTodo(addTodo);
  userInputElement.value = "";
}

for (let todo of todoList) createAndAppendTodo(todo);

addTodoButton.onclick = function () {
  onAddToDo();
};
