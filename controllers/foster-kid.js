// external libraries imports

// internal modules/libraries imports
var db = require('../config/mysql')


// save a foster kid
exports.save = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    let { name, dob, reason_here } = req.body 
    let verified_by = req.user.id

    let query = 'insert into foster_kids ( name, dob, reason_here, verified_by ) values ( ?, ?, ?, ? )'
    let [ result ] = await db.query(query, [ name, dob, reason_here, verified_by ])

    if( result.affectedRows == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}

// delete a foster kid
exports.delete = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.body 

    let query = 'delete from foster_kids where id = ?'
    let [ result ] = db.query(query, [ id ])

    if( result.affectedRows == 1 ) {
        response.deleted = true 
    }
    res.json(response)

}

// check if a foster kid exists  
exports.exists = async function(req, res) {
    let response = { results: {} }
    let { name } = req.params 

    let query = 'select * from foster_kids where name = ?'
    let [ rows, fields ] = await db.execute(query, [ name ]);
    response.results = rows

    res.json(response)
}

// get details of a foster kid
exports.getDetails = async function(req, res) {
    let response = { details: {} }
    let id = req.params.id 

    let query = 'select * from foster_kids where id = ?'
    let [ rows, fields ] = await db.execute(query, [ id ]);
    response.details = rows[0] 

    res.json(response)
}

// get facilities this foster kid has been to 
exports.getFacilities = async function(req, res) {
    let response = { facilities: {} }
    let id = req.params.id 

    let query = 'select * from facility_kids where foster_kid_id = ?'
    let facilityQuery = 'select * from facilities where id in ( select facility_id from facility_kids where foster_kid_id = ? )'
    let [ rows, fields ] = await db.execute(query, [ id ]);
    let [ facilitiez ] = await db.execute(facilityQuery, [ id ]);

    let facilities = rows.map(  (row)=> {
        let facility = facilitiez.find( (fac)=> fac.id == row.facility_id )
        return { facility: facility, record: row }
    })
    response.facilities = facilities 
    
    res.json(response)
}

// place a kid in a new facility  
exports.placeKid = async function(req, res) {
   let response = { saved: false, id: null, errors: [] }

   let { id, facility_id, reason } = req.body 
   let verified_by = req.user.id 

   let query = 'insert into facility_kids ( foster_kid_id, facility_id, verified_by, reason ) values ( ?, ?, ?, ? )'
   let [ result ] = await db.query(query, [ id, facility_id, verified_by, reason ])

   if( result && result.affectedRows == 1 ) {
       response.saved = true 
       response.id = result.insertId
   }
   res.json(response)

}