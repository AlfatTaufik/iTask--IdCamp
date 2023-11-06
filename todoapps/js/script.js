const todos = [];
const RENDER_EVENT = "render-todo";

  function generateId() {
    return +new Date();
  }

  function RENDER_EVENT(id, task, timestamp, isCompleted) {
    return {
      id,
      task,
      timestamp,
      isCompleted,
    };
  }

  function makeToDo(toDoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerHTML = toDoObject.task;

    const textDate = document.createElement('p');
    textDate.innerHTML = toDoObject.timestamp;

  }

    function addToDo() {
      const titleToDo = document.getElementById("title").value;
      const dateToDo = document.getElementById("date").value;

      const generateID = generateId();
      const toDoObject = generateToDoObject(generateID, titleToDo, dateToDo, false);
      todos.push(toDoObject);

      document.dispatchEvent(new Event(RENDER_EVENT));
    }

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addToDo();
  });
});
