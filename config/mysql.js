// import external libraries used
var mysql = require('mysql')

// setup database connection details
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lifeboat' 
})

// establish a connection using the set details
connection.connect( function(error) {
    if( error ) {
        console.log('an error occured while connecting to the database')
    } else {
        console.log('connection to the db established successfully')
    }
})

// export our connection
module.exports = connection
