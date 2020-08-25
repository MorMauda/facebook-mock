const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'AfekaBook'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected to the database.");
});



module.exports = connection;
