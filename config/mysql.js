// import external libraries used
var mysql = require('mysql')

// include app configuration variables
var AppVars = require('./vars')

// setup database connection details
var connection = mysql.createConnection({
    host: AppVars.database.host,
    user:  AppVars.database.user,
    password:  AppVars.database.password,
    database:  AppVars.database.database 
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
