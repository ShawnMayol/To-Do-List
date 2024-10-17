document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1;
  const itemsPerPage = 10;
  let totalItems = 0;
  let newlyAddedTasks = [];
  let nextNewId = 201;

  // Fetch To-Do List
  function fetchToDoList(page = 1) {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((data) => {
        totalItems = data.length + newlyAddedTasks.length;
        document.getElementById("toDoList").innerHTML = "";

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = data.slice(start, end);

        paginatedItems.forEach(function (toDo) {
          const tr = document.createElement("tr");
          tr.setAttribute("data-id", toDo.id);
          tr.innerHTML = `
              <td>${toDo.id}</td>
              <td>${toDo.title}</td>
              <td class="${toDo.completed ? "table-success" : "table-danger"}">
                ${toDo.completed ? "Completed" : "Not Completed"}
              </td>
              <td>
                <button class="btn btn-primary viewBtn">Edit</button>
                <button class="btn btn-danger deleteBtn">Delete</button>
              </td>
            `;
          document.getElementById("toDoList").appendChild(tr);
        });

        if (page === Math.ceil(totalItems / itemsPerPage)) {
          newlyAddedTasks.forEach(function (newTask) {
            const tr = document.createElement("tr");
            tr.setAttribute("data-id", newTask.id);
            tr.innerHTML = `
                <td>${newTask.id}</td>
                <td>${newTask.title}</td>
                <td class="table-danger">Not Completed</td>
                <td>
                  <button class="btn btn-primary viewBtn">Edit</button>
                  <button class="btn btn-danger deleteBtn">Delete</button>
                </td>
              `;
            document.getElementById("toDoList").appendChild(tr);
          });
        }

        document.getElementById("pageInfo").innerText = `Page ${page}`;
        document.getElementById("prevPage").disabled = page === 1;
        const lastPage = Math.ceil(totalItems / itemsPerPage);
        document.getElementById("nextPage").disabled = page >= lastPage;
      })
      .catch(() => alert("Error fetching the to-do list. Please try again."));
  }

  fetchToDoList(currentPage);

  // Add To-Do
  document.getElementById("addToDo").addEventListener("click", function () {
    const title = document.getElementById("newTitle").value.trim();
    if (title === "") {
      alert("Please enter a task title!");
      return;
    }

    const completed = false;
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: title,
        completed: completed,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Task added successfully!");
        document.getElementById("newTitle").value = "";

        data.id = nextNewId++;
        newlyAddedTasks.push(data);

        totalItems++;
        const lastPage = Math.ceil(totalItems / itemsPerPage);
        currentPage = lastPage;
        fetchToDoList(currentPage);
      })
      .catch(() => alert("Error adding the task. Please try again."));
  });

  // View button click event
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("viewBtn")) {
      const id = e.target.closest("tr").getAttribute("data-id");
      const newTask = newlyAddedTasks.find((task) => task.id == id);

      if (newTask) {
        document.getElementById("viewId").value = newTask.id;
        document.getElementById("viewTitle").value = newTask.title;
        document.getElementById("viewCompleted").value =
          newTask.completed.toString();
        const viewToDoModal = new bootstrap.Modal(
          document.getElementById("viewToDoModal")
        );
        viewToDoModal.show();
      } else {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then((response) => response.json())
          .then((data) => {
            document.getElementById("viewId").value = data.id;
            document.getElementById("viewTitle").value = data.title;
            document.getElementById("viewCompleted").value =
              data.completed.toString();
            const viewToDoModal = new bootstrap.Modal(
              document.getElementById("viewToDoModal")
            );
            viewToDoModal.show();
          })
          .catch(() =>
            alert("Error fetching the task details. Please try again.")
          );
      }
    }
  });

  // Save changes to the task
  document
    .getElementById("saveChangesBtn")
    .addEventListener("click", function () {
      const id = document.getElementById("viewId").value;
      const updatedTitle = document.getElementById("viewTitle").value.trim();
      const updatedCompleted =
        document.getElementById("viewCompleted").value === "true";

      if (updatedTitle === "") {
        alert("Title cannot be empty!");
        return;
      }

      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          id: id,
          title: updatedTitle,
          completed: updatedCompleted,
          userId: 1,
        }),
      })
        .then((response) => response.json())
        .then((updatedTask) => {
          alert("Task updated successfully!");
          const viewToDoModal = bootstrap.Modal.getInstance(
            document.getElementById("viewToDoModal")
          );
          viewToDoModal.hide();

          const taskRow = document.querySelector(
            `tr[data-id="${updatedTask.id}"]`
          );
          if (taskRow) {
            taskRow.querySelector("td:nth-child(2)").textContent =
              updatedTask.title;
            const statusCell = taskRow.querySelector("td:nth-child(3)");

            if (updatedTask.completed) {
              statusCell.classList.remove("table-danger");
              statusCell.classList.add("table-success");
              statusCell.textContent = "Completed";
            } else {
              statusCell.classList.remove("table-success");
              statusCell.classList.add("table-danger");
              statusCell.textContent = "Not Completed";
            }
          }

          const newTaskIndex = newlyAddedTasks.findIndex(
            (task) => task.id == id
          );
          if (newTaskIndex !== -1) {
            newlyAddedTasks[newTaskIndex] = updatedTask;
          }
        })
        .catch(() => alert("Error updating the task. Please try again."));
    });

  // Pagination
  document.getElementById("prevPage").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      fetchToDoList(currentPage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", function () {
    const lastPage = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < lastPage) {
      currentPage++;
      fetchToDoList(currentPage);
    }
  });

  // Delete button click event
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("deleteBtn")) {
      const id = e.target.closest("tr").getAttribute("data-id");
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );

      if (confirmDelete) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              const taskRow = document.querySelector(`tr[data-id="${id}"]`);
              if (taskRow) {
                taskRow.remove();
              }
              alert("Task deleted successfully!");
              totalItems--;
            } else {
              throw new Error("Failed to delete the task");
            }
          })
          .catch(() => alert("Error deleting the task. Please try again."));
      } else {
        alert("Task deletion canceled.");
      }
    }
  });
});
