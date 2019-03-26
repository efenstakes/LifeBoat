// external libraries imports
var express = require('express')
var router = express.Router()

// save route
router.post('/save', function(req, res) {
    res.send('save')
})


// delete route
router.post('/delete', function(req, res) {
    res.send('delete facility')
})


// get details of a facility 
// its supervisor, inspections, kids, location etc..
router.get('/:id/details', function(req, res) {
    res.send('get details of a facility')
})

// get kids in a facility 
router.get('/:id/kids', function(req, res) {
    res.send('get kids in a facility')
})

// get history of all kids in a facility 
router.get('/:id/kids/all', function(req, res) {
    res.send('get history of all kids in a facility')
})


// get supervisors of a facility -- the history
router.get('/:id/supervisors', function(req, res) {
    res.send('get supervisors in a facility')
})


// get all facilities   
router.get('/all', function(req, res) {
    res.send('get all facilities')
})

// get all facilities in a country   
router.get('/all/country/:country', function(req, res) {
    res.send('get all facilities in a country')
})

// get all facilities in a city   
router.get('/all/city/:city', function(req, res) {
    res.send('get all facilities in a city ')
})


// write report that a facility was checked    
router.post('/:id/write-report', function(req, res) {
    res.send('write report that a facility was checked')
})


module.exports = router 