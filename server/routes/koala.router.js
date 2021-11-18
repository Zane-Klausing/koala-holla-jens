const express = require('express');
const router = express.Router();

// DB CONNECTION


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
    console.log('POST /koalas');
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


// DELETE

module.exports = router;