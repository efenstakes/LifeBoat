// import external libraries used
var mysql = require('mysql2/promise')

// include app configuration variables
var AppVars = require('./vars')


// setup database connection details
var connection = mysql.createPool({
    host: AppVars.database.host,
    user:  AppVars.database.user,
    password:  AppVars.database.password,
    database:  AppVars.database.database 
})

// export our connection
module.exports = connection
