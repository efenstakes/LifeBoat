// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// import internal modules
var facilityControllers = require('../controllers/facility')



/**
* @api {post} /  add a facility to the system  
* @apiVersion 1.0.0
* @apiName  add facility  
* @apiGroup Facility
* @apiDescription  add a new facility to the system  
*
* @apiParam (Request body) {String} name facility name
* @apiParam (Request body) {String} city city the facility is located
* @apiParam (Request body) {String} lat its location latitude to help search it in maps
* @apiParam (Request body) {String} lng its location longitude to help search it in maps
* @apiParam (Request body) {String} city The Staff city
* @apiParam (Request body) {String} staff_type The Staff staff_type
*
* @apiExample {js} Example usage:
* const data = {
*    "name": "Nairobi Kids Facility",
*    "city": "Cairo",
*    "lat": "-1.360766",
*    "lng": "42.167809655"
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} saved determines if the facility was added
* @apiSuccess (Success 201) {String} id containing the id of the facility if it was added
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
router.post('/', passport.authenticate('gov-staff-jwt', { session: false }), facilityControllers.save)



/**
* @api {delete} /  delete a facility 
* @apiVersion 1.0.0
* @apiName  delete facility  
* @apiGroup Facility 
* @apiDescription  delete a facility 
*
* @apiParam (Request body) {Number} id the id of the government staff
*
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
* @apiSuccess (Success 201) {Boolean} deleted boolean determining if facility is deleted
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "deleted": true|false
*    }
*
*/
router.delete('/', passport.authenticate('gov-staff-jwt', { session: false }), facilityControllers.delete) 


/**
* @api {get} /:id/  get details of a facility   
* @apiVersion 1.0.0
* @apiName  get facility details   
* @apiGroup Facility
* @apiDescription  get details of a facility. its supervisor, inspections, kids, location etc..   
*
* @apiParam {String} id  the facility ID
*
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Object} Facility the facility details
* @apiSuccess (Success 201) {Object} Supervisor the facility supervisor details
* @apiSuccess (Success 201) {Array} Kids a list of the kids in the facility
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "facility": {},
*      "supervisor": {},
*      "kids": []  
*    }
*
*/
router.get('/:id', facilityControllers.getDetails)
 

/**
* @api {post} /:id/kids  get kids in a facility  
* @apiVersion 1.0.0
* @apiName  get kids 
* @apiGroup  Facility
* @apiDescription  get kids in a facility in an Array
*
* @apiParam {String} ID the facility id whose kids we are fetching
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} kids list of kids i the facility
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "kids": [] 
*    }
*
*/
router.get('/:id/kids', facilityControllers.getKids)


/**
* @api {post} /:id/kids/history  get history of all kids in a facility   
* @apiVersion 1.0.0
* @apiName  get history of kids  
* @apiGroup Facility
* @apiDescription  get history of all kids in a facility   
*
* @apiParam {String} ID id of the facility whose history we are to fetch
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} Kids the array of kids in a facility
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "kids": [] 
*    }
*
*/

router.get('/:id/kids/history', facilityControllers.getKidsHistory)


/**
* @api {post} /:id/supervisors  get history supervisors of a facility 
* @apiVersion 1.0.0
* @apiName  check if a staffer is authenticated  
* @apiGroup Facility 
* @apiDescription  check if a staffer is authenticated  
*
* @apiParam  {Array} supervisor  the array of supervisors for a facility
*
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} supervisor array of supervisors a facility has had
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "supervisors": []
*    }
*
*/
router.get('/:id/supervisors', facilityControllers.getSupervisors)
  

/**
* @api {post} /  get all facilities   
* @apiVersion 1.0.0
* @apiName  get all facilities  
* @apiGroup  Facility
* @apiDescription  get all facilities in the system 
*
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} array of facilities in the system
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "facilities": [] 
*    }
*
*/
router.get('/', facilityControllers.getAll)  


/**
* @api {post} /  get all facilities in a city    
* @apiVersion 1.0.0
* @apiName  get city facilities  
* @apiGroup Facility
* @apiDescription  get all facilities in a city 
*
* @apiParam {Number} id the id of the facility 
* @apiParam {String} city the city name whose facilities we are getting
*
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} array of facilities in a city
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "facilities": [] 
*    }
*
*/
router.get('/all/city/:city', facilityControllers.getAllInCity)


module.exports = router 