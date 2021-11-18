const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
// DB CONNECTION


// GET



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