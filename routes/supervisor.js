// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// internal modules/libraries imports
var supervisorController = require('../controllers/supervisor')


// save route
router.post('/', passport.authenticate('gov-staff-jwt', { session: false }), supervisorController.save)


// delete route
router.delete('/', passport.authenticate('gov-staff-jwt', { session: false }), supervisorController.delete)


// get supervisor details  
router.get('/:id/', supervisorController.getDetails)


// get facilities this supervisor has been to 
router.get('/:id/facilities', supervisorController.getFacilities)

// get all supervisors  
router.get('/', supervisorController.getAll)


module.exports = router 