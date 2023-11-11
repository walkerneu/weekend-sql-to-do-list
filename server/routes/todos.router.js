const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "id";';
    pool.query(queryText).then(result => {
        console.log('in router.get',);
        // Sends back the results in an object
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error with todos GET', error);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let newTodo = req.body;
    console.log('Adding to-do', newTodo);

    let queryText = `INSERT INTO "todos" ("text")
                     VALUES ($1);`;
    pool.query(queryText, [newTodo.text])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error with todos POST', error);
            res.sendStatus(500);
        });
});

module.exports = router;
