// external libraries imports
var express = require('express')
var router = express.Router()
var passport = require('passport')


// import gov staff controllers
var govStaffControllers = require('../controllers/gov-staff')


// save a government staff
// they are added by an admin or super admin staffer so use passport.authenticate('jwt', { session: false })
router.post('/', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.save)


// delete a government staffer
router.delete('/', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.delete)


// check if an account exists   
// router.post('/account-exists', passport.authenticate('gov-staff', { session: false }), govStaffControllers.accountExists)
router.post('/account-exists', govStaffControllers.accountExists)


// check if a staffer exists by id   
router.post('/:id/exists', govStaffControllers.exists)


// check if a staffer name is already in use   
router.post('/:name/name-used', govStaffControllers.nameUsed)


// get the details of a staffer  
router.get('/:id/', govStaffControllers.getStafferDetails)


// set the priviledge a staffer has
// ex.. regular, admin, super admin 
// router.post('/:id/set-privilegde', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.setPriviledge)
router.post('/:id/set-priviledge', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.setPriviledge)


// get kids that this staffer has placed in a childrens home or a foster home  
router.get('/:id/foster-kids/placements', govStaffControllers.getKidPlacements)


// get kids that this staffer has verified to be added to the foster system 
router.get('/:id/foster-kids/verifications', govStaffControllers.getKidVerifications)


// get facilities this staffer has verified  
router.get('/:id/facilities', govStaffControllers.getFacilitiesVerified)

// get facilities this staffer has inspected 
router.get('/:id/facility-inspections', govStaffControllers.getFacilitiesInspected)


// get facilities this staffer has inspected in a city route
router.get('/:id/facilities/city/:city', govStaffControllers.getFacilitiesInspectedInCity)


// get all government staffers 
router.post('/', passport.authenticate('gov-staff', { session: false }), govStaffControllers.getAll)


// login a government staffer 
router.post('/login', passport.authenticate('gov-staff', { session: false }), govStaffControllers.login)

// check if a staffer is authenticated    
router.post('/is-authenticated', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.isAuthenticated)


module.exports = router 