const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Y7ji5vE^$KHu",
    database: "employees",
  },
  console.log("Connected to the election database.")
);

module.exports = db;
