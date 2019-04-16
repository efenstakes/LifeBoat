// external libraries import

// internal modules imports
var db = require('../config/mysql')


// save a foster request 
exports.save = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    
    let family_id = req.user.id
    let { foster_kid_id, request_text } = req.body

    let query = 'insert into foster_requests ( family_id, foster_kid_id, request_text ) values( ?, ?, ? )'
    let [ result ] = await db.query(query, [ family_id, foster_kid_id, request_text ])

    if( result.affectedRows  == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}


// set status of a foster request 
exports.setStatus = async function(req, res) {
    let response = { set: false }
    
    let gov_staff_id = req.user.id
    let { id, action } = req.body
    let change_date = new Date()

    let query = 'update foster_requests set status = ?, status_changed = ?, gov_staff_id = ? where id = ?'
    let [ result ] = await db.query(query, [ action, change_date, gov_staff_id, id ])

    if( result.affectedRows  == 1 ) {
        response.set = true 
    }
    res.json(response)

}

// delete a request
exports.delete = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.body 
    
    if( req.user.user_type == 'GOV_STAFF' ) {
        let query = 'delete from foster_requests where id = ?'
        let [ result ] = await db.execute(query, [ id ])
    
        if( result.affectedRows == 1 ) {
            response.deleted = true 
        }
    }
    if( req.user.user_type == 'FAMILY' ) {
        let query = 'delete from foster_requests where id = ? and family_id = ?'
        let [ result ] = await db.execute(query, [ id, req.user.user.id ])
    
        if( result.affectedRows == 1 ) {
            response.deleted = true 
        }
    }

    res.json(response)

}

// get foster request details  
exports.getDetails = async function(req, res) {
    let response = { request: {} }
    let id = req.params.id 

    let query = 'select * from foster_requests where id = ?'
    let familyQuery = 'select * from foster_families where id = ?'
    let kidQuery = 'select * from foster_kids where id = ?'

    let [ rows ] = await db.execute(query, [ id ])

    if( rows && rows[0] ) {
        let request = rows[0]
        let [ familyResult ] = await db.execute(familyQuery, [ request.family_id ])
        let [ kidResult ] = await db.execute(kidQuery, [ request.foster_kid_id ]) 

        response.request = request 
        if( familyResult && familyResult[0] ) {
            let { password, ...familia } = familyResult[0]
            response.request.family = familia
        }
        if( kidResult && kidResult[0] ) {
            response.request.kid = kidResult[0]
        } 
        
    }
    res.json(response)
}

