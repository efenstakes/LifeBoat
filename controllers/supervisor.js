// external libraries imports
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

// internal modules/libraries imports
var db = require('../config/mysql')
var AppVars = require('../config/vars')


// save a supervisor
exports.save = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }

    let { name, password, confirmationPassword, dob, gender, national_id } = req.body 
    let verified_by = req.user.id

    if( password !== confirmationPassword ) {
        response.errors.push({ password: 'passwords must match' })
        return res.json(response)
    }
    let passwordHash = bcrypt.hashSync(password, 10)

    let query = 'insert into supervisors ( name, password, dob, gender, national_id, verified_by ) values ( ?, ?, ?, ?, ?, ? )'
    let [ result ] = await db.query(query, [ name, passwordHash, dob, gender, national_id, verified_by ])

    if( result.affectedRows == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}


// delete a supervisor
exports.delete = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.body 

    let query = 'delete from supervisors where id = ?'
    let [ result ] = db.query(query, [ id ])

    if( result.affectedRows == 1 ) {
        response.deleted = true 
    }
    res.json(response)

}

// get supervisor details  
exports.getDetails = async function(req, res) {
    let response = { details: {} }
    let id = req.params.id 

    let query = 'select * from supervisors where id = ?'
    let facilitySupervisorQuery = 'select * from facilities where id in ( select facility_id from facility_supervisors where supervisor_id = ? )'
    let facilitiesQuery = 'select * from facility_supervisors where supervisor_id = ?'

    let [ rows ] = await db.execute(query, [ id ])

    if( rows && rows[0] ) {
        let [ facilitySupervisorResult ] = await db.execute(facilitySupervisorQuery, [ id ])
        let [ facilitiesResult ] = await db.execute(facilitiesQuery, [ id ])    
    
        let facilityMap = facilitiesResult.map( (facility)=> {
            let record = facilitySupervisorResult.find( (facty)=> facty.facility_id == facility.id )
            return { facility: facility, record: record }
        })
        response.details = rows[0] 
        response.details.history = facilityMap 
        
    }
    res.json(response)
}

// get facilities this supervisor has been to 
exports.getFacilities = async function(req, res) {
    let response = { facilities: {} }
    let id = req.params.id 

    let query = 'select * from facility_supervisors where supervisor_id = ?'
    let facilityQuery = 'select * from facilities where id in ( select facility_id from facility_supervisors where supervisor_id = ? )'
    let [ rows, fields ] = await db.execute(query, [ id ]);
    let [ facilitiez ] = await db.execute(facilityQuery, [ id ]);

    let facilities = rows.map(  (row)=> {
        let facility = facilitiez.find( (fac)=> fac.id == row.facility_id )
        return { facility: facility, record: row }
    })
    response.facilities = facilities 
    
    res.json(response)
}

// get all supervisors   
exports.getAll = async function(req, res) {
    let response = { supervisors: {} }

    let query = 'select * from supervisors'
    let [ rows, fields ] = await db.execute(query, [ ]);
    response.supervisors = rows

    res.json(response)
}


// login a supervisor 
exports.login = async function(req, res) {
    
    let response = { token: null, user: {} }

    if( req.user && req.user.id ) {

        let token_data = { id: req.user.id, type: 'SUPERVISOR', timestamp: Date.now() }
        let token = jwt.sign({ data: token_data }, AppVars.jwt.secret)
        response.token = token 
        response.user = req.user 

    }
    res.json(response)
    
}
