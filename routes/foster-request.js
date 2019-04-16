// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// internal modules/library imports
var fosterRequestController = require('../controllers/foster-request')



/**
* @api {post} /  add a foster request to the system  
* @apiVersion 1.2.0
* @apiName  add foster family  
* @apiGroup Foster Request
* @apiDescription  add a foster request to the system
*
* @apiParam (Request body) {Number} family_id the id of the foster family
* @apiParam (Request body) {Number} foster_kid_id the foster kid id 
* @apiParam (Request body) {String} request_text some text giving a bit of insight as to why
*
* @apiExample {js} Example usage:
* const data = {
*    "family_id": 53,
*    "foster_kid_id": 753,
*    "request_text": "text"
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} saved determines if the kid was added
* @apiSuccess (Success 201) {String} id containing the id of the request if it was added
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
router.post('/', passport.authenticate('family-jwt', { session: false }), fosterRequestController.save)



/**
* @api {post} /set-status  accept or reject a foster request   
* @apiVersion 1.2.0
* @apiName  accept/reject foster request  
* @apiGroup Foster Request
* @apiDescription  accept or reject a foster family request
*
* @apiParam (Request body) {Number} id the id of the request
* @apiParam (Request body) {Number} action the action to take on request (accept or reject)
*
* @apiExample {js} Example usage:
* const data = {
*    "id": 3476
*    "action": 'ACCEPT' | 'REJECT'
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} set determines if the change was made
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*       "set": true|false
*     }
*
*/
router.post('/set-status', passport.authenticate('gov-staff-jwt', { session: false }), fosterRequestController.setStatus)



/**
* @api {delete} /  delete a foster request 
* @apiVersion 1.2.0
* @apiName  delete family  
* @apiGroup Foster Request 
* @apiDescription  delete a foster request from the system
*
* @apiParam  (Request Body) {Number} id the id of the request we are deleting
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
* @apiSuccess (Success 201) {Boolean} deleted boolean determining if request was deleted
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "deleted": true|false
*    }
*
*/
router.delete('/', passport.authenticate('all-jwt', { session: false }), fosterRequestController.delete)


/**
* @api {get} /:id/  get foster request details
* @apiVersion 1.2.0
* @apiName  get request details
* @apiGroup  Foster Request 
* @apiDescription  get foster request details
*
* @apiParam {String} id the id of the foster request
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
* 
* @apiSuccess (Success 201) {Object} request object containing the request's data
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "request": {}
*    }
*
*/
router.get('/:id', fosterRequestController.getDetails)



// export the module routes
module.exports = router 