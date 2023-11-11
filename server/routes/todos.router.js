const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "id";';
    pool.query(queryText).then(result => {
        console.log('in router.get',);
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

router.delete('/:id', (req, res) => {
    let idToDelete = req.params.id;
    let queryText = 'DELETE FROM "todos" WHERE "id" = $1;';

    const sqValues = [idToDelete]
    pool.query(queryText, sqValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((dbError) => {
            console.log("delete todo failed", dbError);
            res.sendStatus(500);
        })
});

router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let queryText = 'UPDATE "todos" SET "isComplete" = true WHERE "id" = $1;';

    const sqValues = [idToUpdate]
    pool.query(queryText, sqValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((dbError) => {
            console.log("update todo failed", dbError);
            res.sendStatus(500);
        })
});

module.exports = router;
