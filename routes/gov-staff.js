// external libraries imports
var express = require('express')
var router = express.Router()
var passport = require('passport')

// import gov staff controllers
var govStaffControllers = require('../controllers/gov-staff')



/**
* @api {post} / Create a Government Staff Account
* @apiVersion 1.0.0
* @apiName Create Account
* @apiGroup Government Staff
* @apiDescription  Create a Government Staff Account
* @apiPermission authenticated user
*  
* @apiParam (Request body) {String} name The Staff name
* @apiParam (Request body) {String} password The Staff password
* @apiParam (Request body) {String} confirmationPassword Staff confirmationPassword
* @apiParam (Request body) {String} email The Staff email
* @apiParam (Request body) {String} city The Staff city
* @apiParam (Request body) {String} staff_type The Staff staff_type
*
* @apiExample {js} Example usage:
* const data = {
*    "name": "kimmy wesley",
*    "password": "password",
*    "confirmationPassword": "confirmationPassword",
*    "email": "email@email.com",
*    "city": "Cairo",
*    "staff_type": "REGULAR | ADMIN | SUPER_ADMIN"
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} saved Boolean to determine if Staff was saved successfully
* @apiSuccess (Success 201) {String} id The id of the saved staff (id they were saved)
* @apiSuccess (Success 201) {List} errors list of errors that were found with the data (if any) 
*
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "saved": true|false,
*      "id": "id",
*       "errors": []
*    }
*
* @apiUse UnauthorizedError
*/
router.post('/', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.save)



/**
* @api {delete} / Delete a Government Staff Account 
* @apiVersion 1.0.0
* @apiName Delete Account
* @apiGroup Government Staff
* @apiPermission authenticated user
* @apiDescription  Delete a Government Staff Account 
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.delete(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} Boolean to determine if Staff was deleted successfully
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "deleted": true|false
*    }
*
* @apiUse UnauthorizedError
*/
router.delete('/', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.delete)


/**
* @api {post} /account-exists Check if a Government Staff Account Exists
* @apiVersion 1.0.0
* @apiName Check Account
* @apiGroup Government Staff
* @apiDescription  Check if a Government Staff Account Exists
*
* @apiExample {js} Example usage:
* const data = {
*    "name": "kimmy wesley",
*    "password": "password"
* }
*
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} Boolean to determine if Staff account exists
* @apiSuccess (Success 201) {Object} JSON object with user data
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "exists": true|false,
*      "user": {} 
*    }
*
*/
router.post('/account-exists', govStaffControllers.accountExists)


/**
* @api {post} /:id/exists Check if a Government Staff Account Exists By Id
* @apiVersion 1.0.0
* @apiName Check Account By Id
* @apiGroup Government Staff
* @apiDescription  Check if a Government Staff Account Exists By Id
*
* @apiParam {Number} id the id of the government staff
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} Boolean to determine if Staff account exists
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "exists": true|false
*    }
*
*/
router.post('/:id/exists', govStaffControllers.exists)


/**
* @api {post} /:name/exists Check if a Government Staff Name is used
* @apiVersion 1.0.0
* @apiName Check if Account Name is used
* @apiGroup Government Staff
* @apiDescription Check if a Government Staff Name is used
*
* @apiParam {Number} id the id of the government staff
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} Boolean to determine if Staff a name is used
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "used": true|false
*    }
*
*/
router.post('/:name/name-used', govStaffControllers.nameUsed)


/**
* @api {get} /:id/ Get a Government Staffer Details
* @apiVersion 1.0.0
* @apiName Get a Government Staffer Details
* @apiGroup Government Staff
* @apiDescription Get a Government Staffer Details
*
* @apiParam {Number} id the id of the government staff
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Object} Object contain Staff details
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "details": {}
*    }
*
*/
router.get('/:id/', govStaffControllers.getStafferDetails)


/**
* @api {post} /:id/set-priviledge Set the priviledge for a Government Staffer 
* @apiVersion 1.0.0
* @apiName Set a Government Staffer's Priviledge
* @apiGroup Government Staff
* @apiDescription Set the priviledge for a Government Staffer 
*
* @apiParam {Number} id the id of the government staff
*
* @apiExample {js} Example usage:
* const data = {
*    priviledge: 'regular' | 'admin' | 'super admin'    
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} Boolean true if the update was made
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "set": true|false
*    }
*
*/
router.post('/:id/set-priviledge', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.setPriviledge)

 

/**
* @api {get} /:id/foster-kids/placements get kids that this staffer has placed in a childrens home or a foster home 
* @apiVersion 1.0.0
* @apiName get kids that this staffer has placed in a childrens home or a foster home 
* @apiGroup Government Staff
* @apiDescription get kids that this staffer has placed in a childrens home or a foster home 
*
* @apiParam {Number} id the id of the government staff
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {List} List containing the kids
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "kids": []
*    }
*
*/
router.get('/:id/foster-kids/placements', govStaffControllers.getKidPlacements)


/**
* @api {get} /:id/foster-kids/verifications get kids a staffer has verified to be added to the foster system  
* @apiVersion 1.0.0
* @apiName get kids a staffer has verified to be added to the foster system  
* @apiGroup Government Staff
* @apiDescription get kids a staffer has verified to be added to the foster system 
*
* @apiParam {Number} id the id of the government staff
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {List} List containing the kids
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "kids": []
*    }
*
*/
router.get('/:id/foster-kids/verifications', govStaffControllers.getKidVerifications) 


/**
* @api {get} /:id/facilities get facilities a staffer has verified   
* @apiVersion 1.0.0
* @apiName get facilities a staffer has verified   
* @apiGroup Government Staff
* @apiDescription get facilities a staffer has verified 
*
* @apiParam {Number} id the id of the government staff
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {List} List containing the facilities
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "facilities": []
*    }
*
*/
router.get('/:id/facilities', govStaffControllers.getFacilitiesVerified)


/**
* @api {get} /:id/facilities get facilities a staffer has inspected 
* @apiVersion 1.0.0
* @apiName get facilities a staffer has inspected   
* @apiGroup Government Staff
* @apiDescription get facilities a staffer has inspected 
*
* @apiParam {Number} id the id of the government staff
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {List} List containing the facilities
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "facilities": []
*    }
*
*/
router.get('/:id/facility-inspections', govStaffControllers.getFacilitiesInspected)


/**
* @api {get} /:id/facilities/city/:city  get facilities a staffer has inspected in a city route
* @apiVersion 1.0.0
* @apiName  get facilities a staffer has inspected in a city route 
* @apiGroup Government Staff
* @apiDescription  get facilities a staffer has inspected in a city route
*
* @apiParam {Number} id the id of the government staff
* @apiParam {String} city the city name whose facilities we will get
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {List} List containing the facilities
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "facilities": []
*    }
*
*/
router.get('/:id/facilities/city/:city', govStaffControllers.getFacilitiesInspectedInCity)


/**
* @api {post} /  get all staffers in the server
* @apiVersion 1.0.0
* @apiName  get all staffers in the server
* @apiGroup Government Staff
* @apiDescription  get all staffers in the server
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {List} List containing the staffers
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "staffers": []
*    }
*
*/
router.post('/', passport.authenticate('gov-staff', { session: false }), govStaffControllers.getAll)
 


/**
* @api {post} /login  login a government staffer
* @apiVersion 1.0.0
* @apiName  login a government staffer
* @apiGroup Government Staff
* @apiDescription  login a government staffer
*
* @apiExample {js} Example usage:
* const data = {
*    name: "name", 
*    password: "password"    
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {String} String containing the authentication token
* @apiSuccess (Success 201) {Object} Object containing the staff details
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "token": "tokenstring",
*      "user": {} 
*    }
*
*/
router.post('/login', passport.authenticate('gov-staff', { session: false }), govStaffControllers.login)
  

/**
* @api {post} /is-authenticated  check if a staffer is authenticated  
* @apiVersion 1.0.0
* @apiName  check if a staffer is authenticated  
* @apiGroup Government Staff
* @apiDescription  check if a staffer is authenticated  
*
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} Boolean determines if the staffer is authenticated or not
* @apiSuccess (Success 201) {Object} Object containing the staff details
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "is_authenticated": true|false,
*      "user": {} 
*    }
*
*/
router.post('/is-authenticated', passport.authenticate('gov-staff-jwt', { session: false }), govStaffControllers.isAuthenticated)


module.exports = router 