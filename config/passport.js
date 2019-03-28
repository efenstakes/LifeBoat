// import external libraries
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

// import internal libraries
var db = require('./mysql')

/* 
  setup passport local strategy to authenticate users based on their name and password
*/

// LocalStrategy for government staff
passport.use('gov-staff', new LocalStrategy({
        usernameField: 'name', passwordField: 'password'
    }, async function(username, password, done) {

          let query = 'select * from gov_staff where name = ? and password = ?'
          let [ rows ] = await db.query(query, [ username, password ])
          
          if( rows[0] ){
              return done(null, rows[0])
          }
          return done(false)

      }
    )
)

// LocalStrategy for supervisors
passport.use('supervisors', new LocalStrategy({
    usernameField: 'name', passwordField: 'password'
}, async function(username, password, done) {

      let query = 'select * from supervisors where name = ? and password = ?'
      let [ rows ] = await db.query(query, [ username, password ])
      
      if( rows[0] ){
          return done(null, rows[0])
      }
      return done(false)

   }
  )
)
