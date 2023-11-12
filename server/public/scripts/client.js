console.log('JS is sourced!');

getTodos();

//getTodos handles GET response to server
//gets back all of the database info in the response
//triggers render function with response data
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

// renderTodos clears the input value if a new item was submitted
// clears the html fields where to do list will be rendered
// if the item is marked uncomplete in the database
// function renders item to the to do list
// if complete, renders item to completed list
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
            <td class="check" onclick="returnTodos (event, ${todo.id})">✅</td>
            <td>${todo.text}</td>
            <td>${new Date(todo.completedAt).toLocaleString('en-us')}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteTodos(event, ${todo.id})" data-testid="deleteButton">Delete</button></td>
            </tr>
            `
        }
        }
    }

// postTodos handles the POST to the server when
// a new to do is submitted, it makes an object with
// the to do text and sends it to the server in the
// data of the post, the response triggers the
// getTodos function
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

// deleteTodos is an onclick function rendered
// on a delete button for each to do item
// when clicked, the function gets passed the unique
// id of the clicked item
// sweet alert has been sourced in, and a Swal command
// is used to pop up a message to confirm deletion
// if confirmed, a DELETE request is made to the server
// using that unique id
function deleteTodos(event, todoId) {
    event.preventDefault();
    Swal.fire({
        title: "Are you sure you want to delete?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Return`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "", "success");
          axios({
            method: 'DELETE',
            url: `/todos/${todoId}`
          }).then(function (response) {
            getTodos();
        
          }).catch(function (error) {
            console.log('error in DELETE', error);
          });
        } else if (result.isDenied) {
          Swal.fire("To-Do item was not deleted!", "", "info");
        }
      });
}

// updateTodos is an onclick function rendered
// on a button with each uncompleted to do item, when clicked it
// sends a PUT request to the server to update the
// item to be marked complete, and timestamp the
// completion. Here we send data in the
// request, because we are going to use the PUT for two
// different things. a key of 1 is sent, to denote the
// function being used. the response triggers the
// getTodos function
function updateTodos (event, todoId) {
    event.preventDefault();
    axios({
        method: 'PUT',
        url: `/todos/${todoId}`,
        data: {
            key: 1
        }
      }).then(function (response) {
        getTodos();
      }).catch(function (error) {
        console.log('error in PUT', error);
      });
}

// returnTodos is an onclick function rendered
// on a green check mark with each completed todo
// item. When clicked, it sends a PUT request to the
// server to update the clicked item to uncomplete
// and remove the completion timestamp. Here we send
// data in the request to denote whcih function the PUT
// will run, we use a key of 2. The response triggers
// the getTodos function
function returnTodos (event, todoId) {
    event.preventDefault();
    axios({
        method: 'PUT',
        url: `/todos/${todoId}`,
        data: {
            key: 2
        }
      }).then(function (response) {
        getTodos();
      }).catch(function (error) {
        console.log('error in PUT', error);
      });
}