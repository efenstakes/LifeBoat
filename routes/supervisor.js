// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// internal modules/libraries imports
var supervisorController = require('../controllers/supervisor')


/**
* @api {post} /  add a supervisor to the system  
* @apiVersion 1.0.0
* @apiName  add supervisor  
* @apiGroup Supervisors
* @apiDescription  add a supervisor to the system
* 
* @apiParam (Request body) {String} name the name of the supervisor
* @apiParam (Request body) {String} password the password of the supervisor
* @apiParam (Request body) {String} confirmationPassword the password of the supervisor (should be same as password)
* @apiParam (Request body) {DateTime} dob date this supervisor was added
* @apiParam (Request body) {String} gender gender of the supervisor
* @apiParam (Request body) {String} national_id the national id of this supervisor
*
* @apiExample {js} Example usage:
* const data = {
*    "name": "Liz Muwami",
*    "password": "Secret",
*    "confirmationPassword": "Secret",
*    "dob": "2019-10-31 22:10:08",
*    "gender": 'MALE'|'FEMALE',
*    "national_id": "8643467789"
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} saved determines if the kid was added
* @apiSuccess (Success 201) {String} id containing the id of the kid if it was added
* @apiSuccess (Success 201) {Array} errors list of errors if any occured 
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "saved": true|false,
*      "id": null|"id",
*      "errors": []  
*    }
*
*/
router.post('/', passport.authenticate('gov-staff-jwt', { session: false }), supervisorController.save)


/**
* @api {delete} /  delete a supervisor 
* @apiVersion 1.0.0
* @apiName  delete supervisor
* @apiGroup Supervisors
* @apiDescription  delete a supervisor from the system
*
* @apiParam (Request Body) {String} id the id of the supervisor 
* @apiExample {js} Example usage:
* const data = {  
*    "id": "id"    
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.delete(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} deleted boolean determining if supervisor was deleted
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "deleted": true|false
*    }
*
*/
router.delete('/', passport.authenticate('gov-staff-jwt', { session: false }), supervisorController.delete)


/**
* @api {get} /:id/  get supervisor details
* @apiVersion 1.0.0
* @apiName  get supervisor details
* @apiGroup  Supervisors 
* @apiDescription  get supervisor details
*
* @apiParam {String} id the id of the supervisor
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
* 
* @apiSuccess (Success 201) {Object} supervisor object containing the supervisor's data
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "supervisor": {}
*    }
*
*/
router.get('/:id/', supervisorController.getDetails)
 

/**
* @api {get} /:id/facilities  get facilities this supervisor has been to 
* @apiVersion 1.0.0
* @apiName  get supervisor facilities
* @apiGroup   Supervisors
* @apiDescription  get all facilities this supervisor has been to 
*
* @apiParam {String} id the id of the supervisor
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
* 
* @apiSuccess (Success 201) {Array} facilities array containing the facilities this supervisor has been to
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "facilities": {}
*    }
*
*/
router.get('/:id/facilities', supervisorController.getFacilities)


/**
* @api {get} /:id/  get all supervisors
* @apiVersion 1.0.0
* @apiName  get all supervisors
* @apiGroup  Supervisors 
* @apiDescription  get all supervisors
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
* 
* @apiSuccess (Success 201) {Array} supervisors  array containing the supervisors
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "supervisors": {}
*    }
*
*/ 
router.get('/', supervisorController.getAll)


/**
* @api {post} /login  login a supervisor
* @apiVersion 1.0.0
* @apiName  login a supervisor
* @apiGroup Supervisors
* @apiDescription  login a supervisor
*
* @apiParam (Request Body) {Number} name  the name of the supervisor
* @apiParam (Request Body) {Number} password  the password of the supervisor
*
* @apiExample {js} Example usage:
* const data = {
*    name: "name", 
*    password: "password"    
* }
*
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {String} token  String containing the authentication token
* @apiSuccess (Success 201) {Object} user  Object containing the supervisor details
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "token": "tokenstring",
*      "user": {} 
*    }
*
*/
router.post('/login', passport.authenticate('supervisors', { session: false }), supervisorController.login)
  

// export the module routes
module.exports = router 