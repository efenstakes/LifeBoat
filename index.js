// external libraries imports
var express = require('express')

// initializing the application instance
var app = express()

// start the server on port 3000
app.listen(3000, function(){
    console.log('server started at 3000')
})