var mysql = require('mysql');

var db_config = {
    host: "localhost",
    user: "root",
    password: "Hardik@!23",
    database: "assignment",
    charset : 'utf8mb4',
    multipleStatements: true
};


function initializeConnectionPool(db_config){
    var numConnectionsInPool = 0;
    console.log('CALLING INITIALIZE POOL');
    var conn = mysql.createPool(db_config);
    conn.on('connection', function (connection) {
        numConnectionsInPool++;
        console.log('CONNECTION IN POOL : ', numConnectionsInPool);
    });
    conn.on('error', function (error) {
        console.log('ERROR IN CONNECTION IN POOL : ', error);
        console.log(error);
        return initializeConnectionPool(db_config);
    });
    return conn;
}

connection = initializeConnectionPool(db_config);
