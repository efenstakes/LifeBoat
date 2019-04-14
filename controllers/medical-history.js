// external libraries imports

// internal modules/libraries imports
var db = require('../config/mysql')


// save a medical record for a kid
exports.save = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    let { kid_id, disease, description, hospital, ill_on, well_on } = req.body 

    if( !ill_on ) {
        ill_on = new Date()
    }
    if( ! well_on ) {
        well_on = new Date()
    }

    let query = 'insert into medical_history ( foster_kid_id, disease, description, hospital, ill_on, well_on ) values ( ?, ?, ?, ?, ?, ? )'
    let [ result ] = await db.query(query, [ kid_id, disease, description, hospital, ill_on, well_on ])

    if( result.affectedRows == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}

// delete a medical record given its id
exports.delete = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.body 

    let query = 'delete from medical_history where id = ?'
    let [ result ] = await db.query(query, [ id ])

    if( result.affectedRows == 1 ) {
        response.deleted = true 
    }
    res.json(response)

}

// delete all medical history of a kid
exports.deleteAllForKid = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.params 

    let query = 'delete from medical_history where foster_kid_id = ?'
    let [ result ] = await db.execute(query, [ id ])

    if( result.affectedRows > 0 ) {
        response.deleted = true 
    }
    res.json(response)

}



// update a medical record to set its well_on property
exports.update = async function(req, res) {
    let response = { updated: false, errors: [] }
    let { id, well_on } = req.body 

    if( !well_on ) {
        well_on = new Date()
    }

    let query = 'update medical_history set well_on = ? where id = ?'
    let [ rows, fields ] = await db.execute(query, [ well_on, id ])

    if( rows.affectedRows > 0 ) {
        response.updated = true
    }

    res.json(response)
}


// get medical history of a foster kid
exports.getKidHistory = async function(req, res) {
    let response = { history: [] }
    let id = req.params.id 

    let query = 'select * from medical_history where foster_kid_id = ?'
    let [ rows, fields ] = await db.execute(query, [ id ]);

    if( rows ) {
        response.history = rows
    }
    
    res.json(response)
}

