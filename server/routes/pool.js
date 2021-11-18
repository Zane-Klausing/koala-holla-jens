// Hey there, you delightful member of the Gemini cohort. 💎
// You should go check out the README if you're wondering what the
// deal is with this whole /server/modules/pool.js thing.
const pg = require('pg');
const Pool = pg.Pool;

const config = {
  host: 'localhost',
  database: 'koalas'
};

const pool = new Pool(config);

// pool.on('connect', () => {
//   console.log('\tserver-database connection happened.');
// });

pool.on('error', (poolError) => {
  console.error(poolError);
});


module.exports = pool;