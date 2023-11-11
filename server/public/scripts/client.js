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
    const todoDisplay = document.getElementById('todo-list')
    todoDisplay.innerHTML = '';
    for (let todo of todoList) {
        todoDisplay.innerHTML += `
        <div id=${todo.id} data-testid="toDoItem">
        ${todo.text}
        ${todo.isComplete != true ? `<button onclick="updateTodos(event, ${todo.id})" data-testid="completeButton">Mark Complete</button>`:'✅'}
        <button onclick="deleteTodos(event, ${todo.id})" data-testid="deleteButton">Delete</button>
        </div>
        `
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
    console.log(event.target.parentElement)
    axios({
        method: 'PUT',
        url: `/todos/${todoId}`
      }).then(function (response) {
        let todoClass = document.getElementById(`${todoId}`)
        todoClass.classList.add("completed");
        getTodos();
        
        // event.target.parentElement.classList.add("completed");
    
      }).catch(function (error) {
        console.log('error in PUT', error);
      });
}