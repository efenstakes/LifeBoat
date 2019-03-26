// external libraries imports
var express = require('express')


// import application routing files
// routes
var govStaffRoutes = require('./routes/gov-staff')
var facilityRoutes = require('./routes/facility')
var supervisorRoutes = require('./routes/supervisor')
var kidRoutes = require('./routes/foster-kid')

// include database connection
var dbConnection = require('./config/mysql')

// initializing the application instance
var app = express()

// set up the routes
app.use('/api/gov', govRoutes)
app.use('/api/gov-staff', govStaffRoutes)
app.use('/api/facility', facilityRoutes)
app.use('/api/supervisor', supervisorRoutes)
app.use('/api/kid', kidRoutes)


// start the server on port 3000
app.listen(3000, function(){
    console.log('server started at 3000')
})