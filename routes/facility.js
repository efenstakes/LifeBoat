// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// import internal modules
var facilityControllers = require('../controllers/facility')


// save a facility
router.post('/', passport.authenticate('gov-staff-jwt', { session: false }), facilityControllers.save)


// delete a facility
router.delete('/', passport.authenticate('gov-staff-jwt', { session: false }), facilityControllers.delete) 


// get details of a facility 
// its supervisor, inspections, kids, location etc..
router.get('/:id', facilityControllers.getDetails)


// get kids in a facility 
router.get('/:id/kids', facilityControllers.getKids)


// get history of all kids in a facility 
router.get('/:id/kids/history', facilityControllers.getKidsHistory)


// get supervisors of a facility -- the history
router.get('/:id/supervisors', facilityControllers.getSupervisors)


// get all facilities   
router.get('/', facilityControllers.getAll)


// get all facilities in a city   
router.get('/all/city/:city', facilityControllers.getAllInCity)


module.exports = router 