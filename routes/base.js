// import external libraries
var router = require('express').Router()
var passport = require('passport')

// log any user out
router.post('/logout', function(request, response) {
    request.logout()
    response.json({ logged_out: true })
})


module.exports = router
