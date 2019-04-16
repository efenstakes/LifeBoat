// import external libraries
var router = require('express').Router()
var passport = require('passport')
var { check, validationResult } = require('express-validator')

// import gov staff controllers
var medHistoryControllers = require('../controllers/medical-history')




/**
* @api {post} / Add a Medical History for a kid
* @apiVersion 1.2.0
* @apiName Create Medical History
* @apiGroup Medical History
* @apiDescription  add medical history for a kid
* @apiPermission authenticated user
*  
* @apiParam (Request body) {String} kid_id  The ID of the kid whose record we are to add
* @apiParam (Request body) {String} disease  The disease the kid was dianosed with
* @apiParam (Request body) {String} description The description of the disease or situation
* @apiParam (Request body) {String} hospital  The hospital the kid was treated at
*
* @apiExample {js} Example usage:
* const data = {
*    "kid_id": "kid_id",
*    "disease": "disease",
*    "description": "description",
*    "hospital": "hospital"
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
*       "saved": true|false,
*       "id": "id",
*       "errors": []
*    }
*
* @apiUse UnauthorizedError
*/
router.post('/', passport.authenticate('supervisor-jwt', { session: false }), medHistoryControllers.save)


/**
* @api {delete} / Delete a Medical history record
* @apiVersion 1.2.0
* @apiName Delete Medical History
* @apiGroup Medical History
* @apiPermission authenticated user
* @apiDescription  Delete a Medical history record 
*
* @apiParam (Request body) {Number}  ID the id of the medical record we are deleting
* @apiExample {js} Example usage:
* const data = {
*    "id": 12
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.delete(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} deleted to determine if delete was successful
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "deleted": true|false
*    }
*
* @apiUse UnauthorizedError
*/
router.delete('/', passport.authenticate('all-jwt', { session: false }), medHistoryControllers.delete)


/**
* @api {delete} /kid/:id  Delete Medical history of a Kid 
* @apiVersion 1.2.0
* @apiName Delete Medical History
* @apiGroup Medical History
* @apiPermission authenticated user
* @apiDescription  Delete all Medical history of a Kid
*
* @apiParam {Number}  ID the id of the kid whose records we are deleting
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.delete(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} deleted to determine if delete was successful
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "deleted": true|false
*    }
*
* @apiUse UnauthorizedError
*/
router.delete('/kid/:id', passport.authenticate('gov-staff-jwt', { session: false }), medHistoryControllers.deleteAllForKid)



/**
* @api {put} / Update a Medical History record
* @apiVersion 1.2.0
* @apiName Update Medical History
* @apiGroup Medical History
* @apiDescription  Update a medical history record
* @apiPermission authenticated user
*  
* @apiParam (Request body) {Number} id  The ID of the record we are to delete
* @apiParam (Request body) {Date} well_on  The date the kid got okay
*
* @apiExample {js} Example usage:
* const data = {
*    "id": "kid_id",
*    "well_on": "DateTime"
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.put(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} updated Boolean to determine if Staff was saved successfully
* @apiSuccess (Success 201) {List} errors list of errors that were found with the data (if any) 
*
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*       "updated": true|false,
*       "errors": []
*    }
*
* @apiUse UnauthorizedError
*/
router.put('/', passport.authenticate('all-jwt', { session: false }), medHistoryControllers.update)


/**
* @api  {get} /kid/:id/  Get medical history of a kid
* @apiVersion  1.2.0
* @apiName  Get medical history
* @apiGroup  Medical History
* @apiDescription  Get medical history of a kid
*
* @apiParam  {Number} id  the id of the kid whose records we are getting
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Object} history  array of the kids records
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "history": []
*    }
*
*/
router.get('/kid/:id/', passport.authenticate('all-jwt', { session: false }), medHistoryControllers.getKidHistory)


// export module routes
module.exports = router