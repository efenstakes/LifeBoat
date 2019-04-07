// import external libraries
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

// import database handle
var db = require('../config/mysql')
var AppVars = require('../config/vars')


// save staffer
exports.save = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    
    // get data passed by client
    let { name, password, confirmationPassword, email, city, staff_type } = req.body

    if( !req.user || req.user.staff_type == 'REGULAR' ) {
        response.errors.push({ error: 'operation not authorised' })
        return res.json(response)
    }
    if( password !== confirmationPassword ) {
        response.errors.push({ password: 'passwords must match' })
        return res.json(response)
    }
    let passwordHash = bcrypt.hashSync(password, 10)
    
    let insertQuery = 'insert into gov_staff (name, password, email, city, staff_type) values (?, ?, ?, ?, ?)'
    let [ result, error ] = await db.query(insertQuery, [ name, passwordHash, email, city, staff_type ])
    
    if( !error && result.affectedRows == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)
    
}

// delete a staffer
exports.delete = async function(req, res) {
    
    let response = { deleted: false }

    if( req.user ) {

        let query = 'delete from gov_staff where id = ?'
        let [ result ] = await db.execute(query, [ req.user.id ])
        
        if( result.affectedRows > 0 ) {
            response.deleted = true
        }
        
    }
     res.json(response);
}


// check if a user account exists
exports.accountExists = async function(req, res) {
    
    let response = { exists: false, user: {} }
    let { name, password } = req.body

    let query = 'select * from gov_staff where name = ?'
    let [ rows ] = await db.execute(query, [ name ])
    
    if( rows[0] ) {
        let isMatch = await bcrypt.compare(password, rows[0]['password'])

        if( isMatch ) {
            response.exists = true
            response.user = rows[0]
        }
        
    }
    res.json(response) 
    
}


// check if a staffer exists by id
exports.exists = async function(req, res) {
    
    let response = { exists: false }
    let staffer_id = req.params.id

    let query = 'select * from gov_staff where id = ?'
    let [ rows ] = await db.query(query, [ staffer_id ])

    if( rows[0] ) {
        response.exists = true
    }
    res.json(response);
     
}


// check if a staffer name is used 
exports.nameUsed = async function(req, res) {
    
    let response = { used: false }
    let staffer_name = req.params.name

    let query = 'select * from gov_staff where name = ?'
    let [ rows ] = await db.query(query, [ staffer_name ])

    if( rows[0] ) {
        response.used = true
    }
    res.json(response);
     
}


// get details of a staffer
exports.getStafferDetails = async function(req, res) {

    let response = { details: {} }
    let staffer_id = req.params.id 

    let query = 'select * from gov_staff where id = ?'
    let [ rows, fields ] = await db.execute(query, [ staffer_id ]);
    response.details = rows[0] 

    res.json(response)
}


// set a staffer's privilegdge can be 'REGULAR', 'ADMIN' or 'SUPER_ADMIN'
exports.setPriviledge = async function(req, res) {
    let response = { set: false }
    let target_staff_id = req.params.id

    let { priviledge } = req.body

    if ( req.user && req.user.staff_type !== 'REGULAR' ) {
       
        let query = 'update gov_staff set staff_type = ? where id = ?'
        let [ result ] = await db.query(query, [ priviledge, target_staff_id ])
        
        if( result.affectedRows > 0 ) {
            response.set = true 
        }

    }
    res.json(response)
}


// get kids that this staffer has placed in a childrens home or a foster home  
exports.getKidPlacements = async function(req, res) {
    
    // get the kids details, facility details

    let response = { kids: [] }
    let staffer_id = req.params.id 

    let query = `select foster_kids.name as kid_name, foster_kids.dob as kid_dob, 
                  foster_kids.reason_here as kid_reason_here, foster_kids.verified_by as kid_verified_by,
                  facility_kids.facility_id as facility_id, facility_kids.reason as facility_reason_here, 
                  facility_kids.joined_on as facility_joined_on, facility_kids.left_on as facility_left_on 
                  from foster_kids inner join facility_kids on 
                  facility_kids.foster_kid_id = foster_kids.id and facility_kids.verified_by = ?`
    
    let [ rows ] = await db.query(query, [ staffer_id ])
    console.log('rows', rows)

    response.kids = rows.map( (row)=> {
                        let facilityQuery = 'select * from facilities where id = ?'
                        let [ result ] = db.query(facilityQuery, [ row['facility_id'] ])

                        return { kid : row, facility: result }
                    })
    res.json(response);
}


// get kids that this staffer has verified to be added to the foster system 
exports.getKidVerifications = async function(req, res) {
    
    let response = { kids: [] }
    let staffer_id = req.params.id 

    let query = 'select * from foster_kids where verified_by = ?'
    let [ rows ] = await db.query(query, [ staffer_id ])
    response.kids = rows
    
    res.json(response)
}


// get facilities this staffer has verified  
exports.getFacilitiesVerified = async function(req, res) {
    
    let response = { facilities: [] }
    let staffer_id = req.params.id 

    let query = 'select * from facilities where verified_by = ?'
    let [ result ] = await db.query(query, [ staffer_id ])
    response.facilities = result
        
    res.json(response);

}


// get facilities this staffer has inspected 
exports.getFacilitiesInspected = async function(req, res) {
    
    let response = { facilities: [] }
    let staffer_id = req.params.id 

    let query = 'select * from facility_inspections where gov_staff_id = ?'
    let [ result ] = await db.query(query, [ staffer_id ]) 
    response.facilities = result
        
    res.json(response);

}


// get facilities this staffer has inspected in a city route
exports.getFacilitiesInspectedInCity = async function(req, res) {
    
    let response = { facilities: [] }
    let { id, city } = req.params 

    let query = 'select * from facilities where verified_by = ? and city = ?'
    let [ result ] = await db.query(query, [ id, city ])
    response.facilities = result
        
    res.json(response);

}


// get all government staffers
exports.getAll = async function(req, res) {
    
    let response = { staffers: [] }
    let { staff_type } = req.user 

    if( staff_type !== 'SUPER_ADMIN' ) {
        return res.json(response)
    }

    let query = 'select * from gov_staff'
    let [ result ] = await db.query(query)
    response.staffers = result
        
    res.json(response);
}



// login a government staffer 
exports.login = async function(req, res) {
    
    let response = { token: null, user: {} }

    if( req.user && req.user.id ) {

        let token_data = { id: req.user.id, timestamp: Date.now() }
        let token = jwt.sign({ data: token_data }, AppVars.jwt.secret)
        response.token = token 
        response.user = req.user 

    }
    res.json(response)
    
}

exports.isAuthenticated = async function(req, res) {
    
    let response = { is_authenticated: false, user: {} }

    if( req.user && req.user.id ) {

        response.is_authenticated = true 
        response.user = req.user 

    }
    res.json(response)
    
}
