const express = require('express');
const router = express.Router();
// DB CONNECTION
const pool = require('../routes/pool');

// GET
router.get( '/', (req, res) => {
    console.log('in GET');
    const sqlText = 'SELECT * FROM "koalas" ORDER BY "name" DESC;';
    pool.query( sqlText )
        .then( dbResult => {
        console.log(`${dbResult.rows.length} rows to send.`)
        res.send(dbResult.rows );
    }).catch( dbErr => {
        console.error(dbErr);
        res.sendStatus( 500 );
    });
});


// POST - HERE ADAM saveKoala
router.post('/', (req, res) => {
    console.log('POST /koala');
    console.log('req.body:', req.body);
    const newKoala = req.body;
    const sqlText = `
    INSERT INTO "koalas"
        ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES
        ($1, $2, $3, $4, $5);
    `;
    const sqlValues = [
    newKoala.name,
    newKoala.gender,
    newKoala.age,
    newKoala.transferStatus,
    newKoala.notes
    ];
    pool.query(sqlText, sqlValues)
        .then((dbResult) => {
        console.log('\tINSERT succeeded.');
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
    });
}); 


// PUT
router.put('/:id', (req, res) => {
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    const koalaToUpdate = req.params.id;
    let currentStatus = req.body.transferStatus;
    currentStatus = true;
    const sqlText = `
    UPDATE "koalas"
        SET "ready_to_transfer"=$1
        WHERE "id"=$2;
    `;
    const sqlValues = [
    currentStatus,
    koalaToUpdate
    ]

    pool.query(sqlText, sqlValues)
    .then((dbResult) => {
        res.sendStatus(200);
    })
    .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
    })
});

// DELETE


module.exports = router;