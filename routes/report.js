// external libraries imports
var router = require('express').Router()
var passport = require('passport')

// import internal modules
var reportControllers = require('../controllers/report')


/**
* @api {post} /facility  add a report for a certain facility  
* @apiVersion 1.0.0
* @apiName  add facility report  
* @apiGroup Reports
* @apiDescription  add a report for a certain facility to the system   
*
* @apiParam (Request body) {Number} facility_id  id of facility whose report we are adding 
* @apiParam (Request body) {String} report  the text describing the status of the facility
* @apiParam (Request body) {String} status  the status of a facility 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'
*
* @apiExample {js} Example usage:
* const data = {
*    "facility_id": "Nairobi Kids Facility ID",
*    "report": "report here",
*    "status": 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*   
* @apiSuccess (Success 201) {Boolean} saved determines if the facility report was added
* @apiSuccess (Success 201) {String} id containing the id of the report if it was added
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
router.post('/facility', passport.authenticate('gov-staff-jwt', { session: false }), reportControllers.saveForFacility)


/**
* @api {get} /facility/:id/   get reports of a facility
* @apiVersion 1.0.0
* @apiName  get reports 
* @apiGroup  Reports
* @apiDescription   get public reports of a facility in an Array
*
* @apiParam {String} ID the facility id whose reports we are fetching
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} reports  array of public report that have been made for this facility
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "reports": [] 
*    }
*
*/
router.get('/facility/:id', reportControllers.getPublicFacilityReports)


/**
* @api {post} /facility/:id/   get reports of a facility
* @apiVersion 1.0.0
* @apiName  get facility reports 
* @apiGroup  Reports
* @apiDescription   get reports of a facility in an Array
*
* @apiParam {String} ID the facility id whose reports we are fetching
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} reports  array of all report that have been made for this facility
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "reports": [] 
*    }
*
*/
router.post('/facility/:id', reportControllers.getFacilityReports)


/**
* @api {post} /supervisor  add a report for a certain supervisor  
* @apiVersion 1.0.0
* @apiName  add supervisor report  
* @apiGroup Reports
* @apiDescription  add a report for a certain supervisor to the system   
*
* @apiParam (Request body) {Number} supervisor_id  id of supervisor whose report we are adding 
* @apiParam (Request body) {String} report  the text describing the status of the supervisor
* @apiParam (Request body) {String} status  the status of a supervisor 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'
*
* @apiExample {js} Example usage:
* const data = {
*    "supervisor_id": "supervisor ID",
*    "report": "report here",
*    "status": 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*   
* @apiSuccess (Success 201) {Boolean} saved determines if the report was added
* @apiSuccess (Success 201) {String} id containing the id of the report if it was added
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
router.post('/supervisor', passport.authenticate('gov-staff-jwt', { session: false }), reportControllers.saveForSupervisor)


/**
* @api {get} /facility/:id/   get public reports of a facility
* @apiVersion 1.0.0
* @apiName  get reports 
* @apiGroup  Reports
* @apiDescription   get public reports of a supervisor in an Array
*
* @apiParam {String} ID the supervisor id whose reports we are fetching
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} reports  array of public report that have been made for this supervisor
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "reports": [] 
*    }
*
*/
router.get('/supervisor/:id', reportControllers.getPublicSupervisorReports)


/**
* @api {post} /supervisor/:id/   get all reports of a supervisor
* @apiVersion 1.0.0
* @apiName  get supervisor reports 
* @apiGroup  Reports
* @apiDescription   get public and private reports of a supervisor in an Array
*
* @apiParam {String} ID the supervisor id whose reports we are fetching
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} reports  array of all reports that have been made for this supervisor
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "reports": [] 
*    }
*
*/
router.post('/supervisor/:id', passport.authenticate('all-jwt', { session: false }), reportControllers.getSupervisorReports)


/**
* @api {post} /kid  add a report for a certain kid  
* @apiVersion 1.2.0
* @apiName  add kid report  
* @apiGroup Reports
* @apiDescription  add a report for a certain kid to the system   
*
* @apiParam (Request body) {Number} kid_id  id of kid whose report we are adding 
* @apiParam (Request body) {String} private_report  the text describing the status of the kid
* @apiParam (Request body) {String} public_report  the text describing the status of the kid
* @apiParam (Request body) {String} status  the status of a kid 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'
*
* @apiExample {js} Example usage:
* const data = {
*    "kid_id": "Kid ID",
*    "private_report": "private report here",
*    "public_report": "public report here",
*    "status": 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*   
* @apiSuccess (Success 201) {Boolean} saved determines if the foster kid report was added
* @apiSuccess (Success 201) {String} id containing the id of the report if it was added
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
router.post('/kid', passport.authenticate('all-jwt', { session: false }), reportControllers.saveForKid)


/**
* @api {get} /kid/:id/   get public reports of a kid
* @apiVersion 1.2.0
* @apiName  get a kid's public reports 
* @apiGroup  Reports
* @apiDescription   get public reports of a kid in an Array
*
* @apiParam {String} ID the kid id whose reports we are fetching
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} reports  array of public reports that have been made for this kid
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "reports": [] 
*    }
*
*/
router.get('/kid/:id', reportControllers.getPublicKidReports)

/**
* @api {post} /kid/:id/   get public and private reports of a kid
* @apiVersion 1.2.0
* @apiName  get a kid's reports 
* @apiGroup  Reports
* @apiDescription   get public and private reports of a kid in an Array
*
* @apiParam {String} ID the kid id whose reports we are fetching
* @apiExample {js} Example usage:
* const data = {  
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.get(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Array} reports  array of all reports that have been made for this kid
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "reports": [] 
*    }
*
*/
router.post('/kid/:id', passport.authenticate('all-jwt', { session: false }), reportControllers.getKidReports)



// export the module routes
module.exports = router