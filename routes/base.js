// import external libraries
var router = require('express').Router()
var passport = require('passport')


/**
* @api {post} /logout  log any user out 
* @apiVersion 1.0.0
* @apiName  log any user out 
* @apiGroup Government Staff
* @apiDescription  log any user out 
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
* @apiSuccess (Success 201) {Boolean} Boolean flag identifying if a user was logged out or not
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "logged_out": true|false
*    }
*
*/
router.post('/logout', function(request, response) {
    request.logout()
    response.json({ logged_out: true })
})
  


// export the module routes
module.exports = router
