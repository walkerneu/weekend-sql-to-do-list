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