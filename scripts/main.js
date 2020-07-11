// Define containers

const newTaskText = document.querySelector(".section__add--input");
const newTaskBtn = document.querySelector(".section__add--text");
const todoSection = document.querySelector(".section__todo--div");
const completedSection = document.querySelector(".section__completed--div");

//function to create a new task section with complete styling
const createNewTask = (newTaskText) => {
  //create a random ID to use for each task
  let id = Math.random().toString(36).substr(2, 9);
  //create container for task
  let container = document.createElement("div");
  container.setAttribute("class", "section__container");
  container.setAttribute("id", `container--${id}`);
  //create checkbox
  let checkInput = document.createElement("input");
  checkInput.setAttribute("type", "checkbox");
  checkInput.setAttribute("hidden", "");
  checkInput.setAttribute("class", "section__container--checkbox");
  container.appendChild(checkInput);
  checkInput.setAttribute("id", id);
  // add Event Listener to checkbox to move to completed section if checked, or todo if unchecked
  checkInput.addEventListener("click", function () {
    checkInput.checked
      ? completeTask(checkInput.parentNode)
      : uncompleteTask(checkInput.parentNode);
  });
  // create custom styling for checkbox
  let checkmark = document.createElement("label");
  checkmark.setAttribute("for", id);
  checkmark.setAttribute("class", "checkmark");
  container.appendChild(checkmark);
  // create text for todo task
  let task = document.createElement("label");
  task.setAttribute("class", "section__container--text section--text");
  // apply text entered to todo
  let text = document.createTextNode(newTaskText.value);
  task.appendChild(text);
  container.appendChild(task);
  //create edit button
  let edit = document.createElement("p");
  edit.setAttribute("class", "section__container--edit section--edit btn");
  let editText = document.createTextNode("Edit");
  edit.appendChild(editText);
  container.appendChild(edit);
  // add Event Listener to edit buttons
  edit.addEventListener("click", function () {
    editTask(edit.parentNode);
  });
  //create delete button
  let remove = document.createElement("p");
  remove.setAttribute(
    "class",
    "section__container--delete section--delete btn"
  );
  let removeText = document.createTextNode("Delete");
  remove.appendChild(removeText);
  container.appendChild(remove);
  //add Eventlistener to delete button
  remove.addEventListener("click", function () {
    deleteTask(remove.parentNode);
  });
  // append the completed todo task to the todo section
  todoSection.appendChild(container);
  //reset the text in the input field
  newTaskText.value = "";
};

// Add button functionality for new task
newTaskBtn.addEventListener("click", function () {
  createNewTask(newTaskText);
});

// Enter key functionality for new task
newTaskText.addEventListener("keypress", function (e) {
  if (e.key === "Enter") createNewTask(newTaskText);
});

//Edit function
const editTask = (container) => {
  //store the paragraph
  let para = container.childNodes[2];
  //create input element
  let editInput = document.createElement("input");
  console.log(para);
  console.log(editInput);
  editInput.setAttribute("class", "section__add--input");
  //position the paragraph
  editInput.style.gridArea = "text";
  editInput.style.height = "4rem";
  editInput.style.alignSelf = "center";
  //set default placeholder
  editInput.value = para.innerText;
  // create textInput
  para.replaceWith(editInput);
  // focus keyboard on text input
  editInput.focus();
  // add event lsitener to confirm edit when pressing enter key
  editInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      let newTask = editInput.value;
      para.innerText = newTask;
      editInput.replaceWith(para);
    }
  });
};

// Delete function
const deleteTask = (container) => {
  console.log(container.id);
  container.remove();
};

//Complete function
const completeTask = (container) => {
  completedSection.appendChild(container);
};

const uncompleteTask = (container) => {
  todoSection.appendChild(container);
};

// Add default tasks on loading page for first time

let testTask1 = { value: "Book flights" };
let testTask2 = { value: "Buy groceries" };
createNewTask(testTask1);
createNewTask(testTask2);
