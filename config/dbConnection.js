let mysql = require('mysql2');
const { dbConnection } = require('./constant')
const connection = mysql.createConnection({
    connectionLimit: 5,
    host: dbConnection.host,
    port: dbConnection.port,
    user: dbConnection.user,
    password: dbConnection.password,
    database: dbConnection.database
});


connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Database connect successfully.");
});


module.exports = connection