// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// internal modules/library imports
var familyController = require('../controllers/foster-family')



/**
* @api {post} /  add a foster family to the system  
* @apiVersion 1.2.0
* @apiName  add foster family  
* @apiGroup Foster Family
* @apiDescription  add a foster family to the system
*
* @apiParam (Request body) {Number} parent_1_id the national id of the first parent
* @apiParam (Request body) {Number} parent_2_id the national id of the second parent
* @apiParam (Request body) {String} parent_1_name the name of the first parent
* @apiParam (Request body) {String} parent_2_name the name of the second parent
* @apiParam (Request body) {Number} parent_1_phone the phone number of the first parent
* @apiParam (Request body) {Number} parent_2_phone the phone number of the second parent
* @apiParam (Request body) {String} parent_1_email the email of the first parent
* @apiParam (Request body) {String} parent_2_email the email of the second parent
* @apiParam (Request body) {String} city  the city that the family resides mostly
*
* @apiExample {js} Example usage:
* const data = {
*    "parent_1_id": 85432367534,
*    "parent_2_id": 857654213,
*    "parent_1_name": "parent 1 name",
*    "parent_2_name": "parent 2 name",
*    "parent_1_phone": +256 742312454,
*    "parent_2_phone": +256 742312054,
*    "parent_1_email": "parent1@email.com",
*    "parent_2_email": "parent2@email.com",
*    "city": "Mombasa"
* }
*
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
router.post('/', familyController.save)



/**
* @api {post} /verify  verify a foster family   
* @apiVersion 1.2.0
* @apiName  verify foster family  
* @apiGroup Foster Family
* @apiDescription  verify a foster family incase it was not added by a government staffer
*
* @apiParam (Request body) {Number} id the id of the family
*
* @apiExample {js} Example usage:
* const data = {
*    "id": 3476
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
*       "verified": true|false
*     }
*
*/
router.post('/verify', passport.authenticate('gov-staff-jwt', { session: false }), familyController.verify)



/**
* @api {delete} /  delete a foster family 
* @apiVersion 1.2.0
* @apiName  delete family  
* @apiGroup Foster Family 
* @apiDescription  delete a foster family from the system
*
* @apiParam  (Request Body) {Number} id the id of the family we are deleting
*
* @apiExample {js} Example usage:
* const data = {  
*    "id": 98
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
router.delete('/', passport.authenticate('gov-staff-jwt', { session: false }), familyController.delete)


/**
* @api {get} /:id/  get foster family details
* @apiVersion 1.2.0
* @apiName  get family details
* @apiGroup  Foster Family 
* @apiDescription  get foster family details
*
* @apiParam {String} id the id of the foster familt
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
*      "family": {}
*    }
*
*/
router.get('/:id', familyController.getDetails)


/**
* @api {get} /:id/kids  get kids this foster family has had 
* @apiVersion 1.2.0
* @apiName  get kid
* @apiGroup  Foster Family 
* @apiDescription  get the history of kids that this foster family has had 
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
*      "kids": []
*    }
*
*/
router.get('/:id/kids', familyController.getKids)


/**
* @api {get} /:id/reports  get reports that have been made about this family 
* @apiVersion 1.2.0
* @apiName  get reports
* @apiGroup  Foster Family 
* @apiDescription  get reports that have been made about this family
*
* @apiParam {String} id the id of the foster family
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
* @apiSuccess (Success 201) {Array} reports list of reports about the family  
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "reports": []  
*    }
*
*/  
router.get('/:id/reports', passport.authenticate('all-jwt', { session: false }), familyController.getReports)


/**
* @api {post} /login  login a family
* @apiVersion 1.0.0
* @apiName  login a family
* @apiGroup Foster Family
* @apiDescription  login a family
*
* @apiParam (Request Body) {Number} national_id  the national id of either parents
* @apiParam (Request Body) {Number} national_id  the password of the family account
*
* @apiExample {js} Example usage:
* const data = {
*    national_id: 85654336, 
*    password: "password"    
* }
*
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {String} token string containing the authentication token
* @apiSuccess (Success 201) {Object} user object containing the supervisor details
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "token": "tokenstring",
*      "user": {} 
*    }
*
*/
router.post('/login', passport.authenticate('families', { session: false }), familyController.login)
  

// export the module routes
module.exports = router 