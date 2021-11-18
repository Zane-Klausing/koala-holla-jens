const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET



// POST - HERE ADAM saveKoala
router.post('/', (req, res) => {
    console.log('POST /koalas');
    console.log('req.body:', req.body);
    const newKoala = req.body;
    const sqlText = `
      INSERT INTO "koalas"
        ("name", "age", "gender", "readyForTransfer", "notes")
      VALUES
        ($1, $2, $3, $4, $5);
    `;
    const sqlValues = [
      newKoala.name,
      newKoala.age,
      newKoala.gender,
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

module.exports = koalaRouter;