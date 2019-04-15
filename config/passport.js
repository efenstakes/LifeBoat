// import external libraries
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var bcrypt = require('bcrypt')


// import internal libraries
var db = require('./mysql')
var AppVars = require('../config/vars')

/* 
  setup passport local strategy to authenticate users based on their name and password
*/

// LocalStrategy for government staff
passport.use('gov-staff', new LocalStrategy({
        usernameField: 'name', passwordField: 'password'
    }, async function(username, password, done) {

          let query = 'select * from gov_staff where name = ?'
          let [ rows ] = await db.query(query, [ username ])
          
          if( rows && rows[0] ){
              let match = await bcrypt.compare(password, rows[0]['password'])

              if( match ) {
                let { password, ...uzer } = rows[0]
                return done(null, uzer)
              }
          }
          return done(false)

      }
    )
)

// LocalStrategy for supervisors
passport.use('supervisors', new LocalStrategy({
    usernameField: 'name', passwordField: 'password'
}, async function(username, password, done) {

      let query = 'select * from supervisors where name = ?'
      let [ rows ] = await db.query(query, [ username ])
      
      if( rows && rows[0] ){
          let match = await bcrypt.compare(password, rows[0]['password'])

          if( match ) {
            let {password, ...uzer} = rows[0]
            return done(null, uzer)
          }
      }
      return done(false)

   }
  )
)


// LocalStrategy for families authentication
passport.use('families', new LocalStrategy({
  usernameField: 'national_id', passwordField: 'password'
}, async function(national_id, password, done) {

    let query = 'select * from foster_families where parent_1_id = ? or parent_2_id = ?'
    let [ rows ] = await db.query(query, [ national_id, national_id ])
    
    if( rows && rows[0] ){
        let match = await bcrypt.compare(password, rows[0]['password'])

        if( match ) {
          let { password, ...uzer } = rows[0]
          return done(null, uzer)
        }
    }
    return done(false)

}
)
)




// set jwt options
var jwt_opts = {}
jwt_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwt_opts.secretOrKey = AppVars.jwt.secret

// handle jwt authentication for government staffers
passport.use('gov-staff-jwt', new JwtStrategy(jwt_opts, async function(jwt_payload, done) {
  
        let { id, timestamp } = jwt_payload.data 

        // if this timestamp is older than 60 minutes, invalidate it
        if( (Date.now() - timestamp) > 3600000 ) { 
          return done(false)
        }

        let query = 'select * from gov_staff where id = ?'
        let [ rows ] = await db.query(query, [ id ])

        if( rows && rows[0] ) {
          let { password, ...uzer } = rows[0]
          return done(null, uzer)
        }
        return done(false)
        
    }
));

// handle jwt authentication for supervisors 
passport.use('supervisor-jwt', new JwtStrategy(jwt_opts, async function(jwt_payload, done) {
                  
  let { id, timestamp } = jwt_payload.data  
  
  // if this timestamp is older than 60 minutes, invalidate it
  if( (Date.now() - timestamp) > 3600000 ) { 
    return done(false)
  }

  let query = 'select * from supervisors where id = ?'
  let [ rows ] = await db.query(query, [ id ])

  if( rows && rows[0] ) {
    let {password, ...uzer} = rows[0] 
    return done(null, uzer)
  }
  return done(false)
  
}
));


// handle jwt authentication for families 
passport.use('family-jwt', new JwtStrategy(jwt_opts, async function(jwt_payload, done) {
                  
  let { id, timestamp } = jwt_payload.data  
  
  // if this timestamp is older than 60 minutes, invalidate it
  if( (Date.now() - timestamp) > 3600000 ) { 
    return done(false)
  }

  let query = 'select * from foster_families where id = ?'
  let [ rows ] = await db.query(query, [ id ])

  if( rows && rows[0] ) {
    let {password, ...uzer} = rows[0] 
    return done(null, uzer)
  }
  return done(false)
  
}
));


// handle jwt authentication for government staff and supervisors
passport.use('all-jwt', new JwtStrategy(jwt_opts, async function(jwt_payload, done) {
  
  let { id, type, timestamp } = jwt_payload.data 
  let query = '' 
  let db_return = {}

  // if this timestamp is older than 60 minutes, invalidate it
  if( (Date.now() - timestamp) > 3600000 ) { 
    return done(false)
  }

  if( type == 'GOV_STAFF' ) {
    query = 'select * from gov_staff where id = ?'
    let [ rows ] = await db.query(query, [ id ])
    db_return = rows
  } else if( type == 'SUPERVISOR' ) {
    query = 'select * from supervisors where id = ?'
    let [ rows ] = await db.query(query, [ id ])  
    db_return = rows
  } else {
    let query = 'select * from foster_families where id = ?'
    let [ rows ] = await db.query(query, [ id ])
    db_return = rows  
  }

  if( db_return[0] ) {
    let { password, ...uzer } = db_return[0]
    return done(null, { user_type: type, user: uzer })
  }
  return done(false)
  
}
));
