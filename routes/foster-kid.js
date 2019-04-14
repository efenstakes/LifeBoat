// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// internal modules/library imports
var kidsController = require('../controllers/foster-kid')



/**
* @api {post} /  add a foster kid to the system  
* @apiVersion 1.0.0
* @apiName  add foster kid  
* @apiGroup Foster Kids
* @apiDescription  add a foster kid to the system
*
* @apiParam (Request body) {String} name the name of the kid
* @apiParam (Request body) {DateTime} dob date this kid was added
* @apiParam (Request body) {String} gender gender of the kid
* @apiParam (Request body) {String} reason_here reason this kid was added to the system
*
* @apiExample {js} Example usage:
* const data = {
*    "name": "Nairobi Kids Facility",
*    "dob": "2019-10-31 22:10:08",
*    "gender": 'MALE'|'FEMALE',
*    "reason_here": "a reason"
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
router.post('/', passport.authenticate('all-jwt', { session: false }), kidsController.save)


/**
* @api {delete} /  delete a kid 
* @apiVersion 1.0.0
* @apiName  delete kid  
* @apiGroup Foster Kids 
* @apiDescription  delete a kid from the system
*
* @apiParam {Number} id the id of the kid we are deleting
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
* @apiSuccess (Success 201) {Boolean} deleted boolean determining if kid was deleted
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "deleted": true|false
*    }
*
*/
router.delete('/', passport.authenticate('gov-staff-jwt', { session: false }), kidsController.delete)


/**
* @api {get} /:id/exists Check if a kid exists
* @apiVersion 1.0.0
* @apiName Check if kid exists
* @apiGroup Foster Kids 
* @apiDescription Check if a kid exists
*
* @apiParam {String} id the id of the foster kid
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} Boolean to determine if a kid exists  
* @apiSuccess (Success 201) {Object} data contain the kid's data
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "exists": true|false,
*      "data": {}
*    }
*
*/
router.get('/:id/exists', kidsController.exists)


/**
* @api {post} /:name/name-used  Check if a kid's Name is used
* @apiVersion 1.0.0
* @apiName  Check if kid's Name is used
* @apiGroup Foster Kids
* @apiDescription  Check if a kid's Name is used
*
* @apiParam {String} name the name of the foster kid
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} used to determine if a kid's name is used 
* @apiSuccess (Success 201) {Object} data contain the kid's data 
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "used": true|false,
*      "data": {} 
*    }
*
*/
router.get('/:name/name-used', kidsController.nameUsed)
  

/**
* @api {get} /:id/  get foster kid details
* @apiVersion 1.0.0
* @apiName  get kid details
* @apiGroup  Foster Kids 
* @apiDescription  get foster kid details
*
* @apiParam {String} id the id of the foster kid
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
* 
* @apiSuccess (Success 201) {Object} kid object containing the kid's data
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "kid": {}
*    }
*
*/
router.get('/:id', kidsController.getDetails)


/**
* @api {get} /:id/facilities  get facilities this foster kid has been to 
* @apiVersion 1.0.0
* @apiName  get kid facilities
* @apiGroup  Foster Kids 
* @apiDescription  get history of facilities this foster kid has been to
*
* @apiParam {String} id the id of the foster kid
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
* 
* @apiSuccess (Success 201) {Array} facilities a kid has been to
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "facilities": []
*    }
*
*/
router.get('/:id/facilities', kidsController.getFacilities)


/**
* @api {post} /:id/place  place a kid in a new facility 
* @apiVersion 1.0.0
* @apiName  place kid in facily
* @apiGroup  Foster Kids 
* @apiDescription  place a foster kid in a new facility
*
* @apiParam {String} id the id of the foster kid
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} saved determines if the kid was successfully placed
* @apiSuccess (Success 201) {String} id containing the id of the new placement for the kid if they were placed
* @apiSuccess (Success 201) {Array} errors list of errors if any occured 
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "placed": true|false,
*      "id": null|"id",
*      "errors": []  
*    }
*
*/  
router.post('/:id/place', passport.authenticate('gov-staff-jwt', { session: false }), kidsController.placeKid)



module.exports = router 