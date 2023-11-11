console.log('JS is sourced!');

getTodos ();

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
    const todoDisplay = document.getElementById('todo-list')
    todoDisplay.innerHTML = '';
    for (let todo of todoList) {
        todoDisplay.innerHTML += `
        <div data-testid="toDoItem">${todo.text}</div>
        `
    }
}