// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// import internal modules
var reportControllers = require('../controllers/report')


// save a report for a facility
router.post('/facility', passport.authenticate('gov-staff-jwt', { session: false }), reportControllers.saveForFacility)

// get reports of a facility
router.get('/facility', reportControllers.getFacilityReports)


// save a report for a supervisor
router.post('/supervisor', passport.authenticate('gov-staff-jwt', { session: false }), reportControllers.saveForSupervisor)

// get reports of a supervisor
router.get('/supervisor/:id', reportControllers.getSupervisorReports)

