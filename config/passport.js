// import external libraries
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

// import internal libraries
var dbConnection = require('./mysql')

/* 
  setup passport local strategy to authenticate users based on their name and password
*/

// LocalStrategy for government staff
passport.use('gov-staff', new LocalStrategy({
        usernameField: 'name', passwordField: 'password'
    }, function(username, password, done) {

          done(null, 'done')

      }
    )
)

// LocalStrategy for supervisors
passport.use('supervisors', new LocalStrategy({
    usernameField: 'name', passwordField: 'password'
}, function(username, password, done) {

      done(null, 'done')

  }
)
)
