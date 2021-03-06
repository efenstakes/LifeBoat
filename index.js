// external libraries imports
var express = require('express')
var bodyParser = require('body-parser')

// passport
var passport = require('passport')

// import application routing files
// routes
var baseRoutes = require('./routes/base')
var govStaffRoutes = require('./routes/gov-staff')
var facilityRoutes = require('./routes/facility')
var supervisorRoutes = require('./routes/supervisor')
var kidRoutes = require('./routes/foster-kid')
var reportRoutes = require('./routes/report')
var medicalHistoryRoutes = require('./routes/medical-history')
var fosterFamilyRoutes = require('./routes/foster-family')
var fosterRequestRoutes = require('./routes/foster-request')


// initializing the application instance
var app = express()

// setup body parser to help access json and other data from clients
// parse application/x-www-form-urlencoded and json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')


// set up the routes
app.use('/api/gov-staff', govStaffRoutes)
app.use('/api/facility', facilityRoutes)
app.use('/api/supervisor', supervisorRoutes)
app.use('/api/kid', kidRoutes)
app.use('/api/report', reportRoutes)
app.use('/api/medical-history', medicalHistoryRoutes)
app.use('/api/family', fosterFamilyRoutes)
app.use('/api/foster-request', fosterRequestRoutes)
app.use('/api', baseRoutes)


// start the server on port 9999
app.listen(9999, function(){
    console.log('server started at 9999')
})

// export the server instance for tests
module.exports = app 