// external libraries imports
var express = require('express')
var router = express.Router()

// save route
router.post('/save', function(req, res) {
    res.send('save')
})


// delete route
router.post('/delete', function(req, res) {
    res.send('delete gov staff')
})


// set the priviledge a staffer has
// ex.. regular, admin, super admin 
router.post('/:id/make-admin', function(req, res) {
    res.send('set the priviledge a staffer has')
})


// get facilities a this staffer has inspected 
router.get('/:id/facilities', function(req, res) {
    res.send('get facilities a this staffer has inspected')
})

// get facilities a this staffer has inspected in a city route
router.get('/:id/facilities/city/:city', function(req, res) {
    res.send('get facilities a this staffer has inspected in a city')
})


// get the foster kids this staffer has admitted in to facilities  
router.get('/:id/foster-admissions', function(req, res) {
    res.send('get the foster kids this staffer has admitted in to facilities')
})


module.exports = router 