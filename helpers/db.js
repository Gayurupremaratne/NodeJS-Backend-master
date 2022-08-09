const mysql = require("mysql");

var db = {
  pool: mysql.createPool({
    connectionLimit: process.env.PR_DB_POOL_SIZE,
    host: process.env.PR_DB_HOST,
    user: process.env.PR_DB_USER,
    password: process.env.PR_DB_PASSWORD,
    database: process.env.PR_DB_DATABASE,
    debug: false
  }),
  query: function(qry, params, next) {
    qry = mysql.format(qry, params);
    // console.log(qry);
    db.pool.query(qry, function(err, rows) {
      next(err, rows);
    });
  }
};

module.exports = db;
