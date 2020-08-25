const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Facebook_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected to the database.");
});



module.exports = connection;
