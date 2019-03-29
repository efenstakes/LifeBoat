// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// internal modules/library imports
var kidsController = require('../controllers/foster-kid')


// save route
router.post('/save', passport.authenticate('gov-staff-jwt', { session: false }), kidsController.save)


// delete route
router.post('/delete', passport.authenticate('gov-staff-jwt', { session: false }), kidsController.delete)


// check if a foster kid exists  
router.get('/:name/exists', kidsController.exists)

// get foster kid details  
router.get('/:id/details', kidsController.getDetails)


// get facilities this foster kid has been to 
router.get('/:id/facilities', kidsController.getFacilities)

// place a kid in a new facility  
router.post('/:id/place', passport.authenticate('gov-staff-jwt', { session: false }), kidsController.placeKid)



module.exports = router 