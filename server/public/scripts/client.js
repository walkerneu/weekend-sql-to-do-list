console.log('JS is sourced!');

getTodos();

function getTodos() {
    console.log('in getTodos');
    axios({
      method: 'GET',
      url: '/todos'
    }).then(function (response) {
      console.log('getTodos() response', response.data);
      renderTodos(response.data);
    }).catch(function (error) {
      console.log('error in GET', error);
    });
}

function renderTodos (todoList) {
    document.getElementById('todo-input').value = '';
    let newTodo = document.getElementById('new-todo')
    newTodo.innerHTML = '';
    let completeTodo = document.getElementById('complete-todo')
    completeTodo.innerHTML = '';
    for (let todo of todoList) {
        if (todo.isComplete === false) {
            newTodo.innerHTML += `
            <tr id="id-${todo.id}" data-testid="toDoItem">
            <td>${todo.text}</td>
            <td><button type="button" class="btn btn-success" onclick="updateTodos(event, ${todo.id})" data-testid="completeButton">Mark Complete</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteTodos(event, ${todo.id})" data-testid="deleteButton">Delete</button></td>
            </tr>
            `
        }
        if (todo.isComplete === true) {
            completeTodo.innerHTML += `
            <tr id="id-${todo.id}" class="completed" data-testid="toDoItem">
            <td>✅</td>
            <td>${todo.text}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteTodos(event, ${todo.id})" data-testid="deleteButton">Delete</button></td>
            </tr>
            `
        }
            // let todoClass = document.getElementById(`id-${todo.id}`);
            // console.log(todoClass);
            // todoClass.classList.add("completed");
        }
    }


function postTodos(event) {
    event.preventDefault();
    let incTodo = {
        text: document.getElementById('todo-input').value
    }
    axios({
        method: 'POST',
        url: '/todos',
        data: incTodo,
      }).then(function (response) {
        console.log(response.data);
        getTodos();
      }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Error adding to-do. My bad');
      });
}

function deleteTodos(event, todoId) {
    event.preventDefault();
    axios({
      method: 'DELETE',
      url: `/todos/${todoId}`
    }).then(function (response) {
      getTodos();
  
    }).catch(function (error) {
      console.log('error in DELETE', error);
    });
}

function updateTodos (event, todoId) {
    event.preventDefault();
    axios({
        method: 'PUT',
        url: `/todos/${todoId}`
      }).then(function (response) {
        getTodos();
        // let todoClass = document.getElementById(`id-${todoId}`);
        // console.log(todoClass);
        // todoClass.classList.add("completed");
      }).catch(function (error) {
        console.log('error in PUT', error);
      });
}