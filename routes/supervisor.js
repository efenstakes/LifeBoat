// external libraries imports
var express = require('express')
var router = express.Router()

// save route
router.post('/save', function(req, res) {
    res.send('save supervisor')
})


// delete route
router.post('/delete', function(req, res) {
    res.send('delete supervisor')
})


// get supervisor details  
router.get('/:id/details', function(req, res) {
    res.send('get supervisor details')
})

// get facilities this supervisor has been to 
router.get('/:id/facilities', function(req, res) {
    res.send('get facilities this supervisor has been to')
})


// write report that a facility supervisor was checked    
router.post('/:id/write-report', function(req, res) {
    res.send('write report that a facility supervisor was checked')
})


module.exports = router 