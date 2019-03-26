// external libraries imports
var express = require('express')
var router = express.Router()

// save route
router.post('/save', function(req, res) {
    res.send('save foster kid')
})


// delete route
router.post('/delete', function(req, res) {
    res.send('delete foster kid')
})


// get foster kid details  
router.get('/:id/details', function(req, res) {
    res.send('get foster kid details')
})

// get facilities this foster kid has been to 
router.get('/:id/facilities', function(req, res) {
    res.send('get facilities this foster kid has been to')
})



module.exports = router 