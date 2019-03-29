// external libraries import

// internal modules imports
var db = require('../config/mysql')


// save a facility
exports.save = async function(req, res) {
    let response = { saved: false, id: null }
    let { name, city, lat, lng } = req.body
    
    if( req.user && req.user.staff_type !== 'REGULAR' ) {

        let query = 'insert into facilities ( name, city, lat, lng, verified_by ) values( ?, ?, ?, ?, ? )'
        let [ result ] = await db.query(query, [ name, city, lat, lng, req.user.id ])

        if( result.affectedRows == 1 ) {
            response.saved = true 
            response.id = result.insertId
        }

    } 
    res.json(response)
    
}


// write report that a facility was checked
exports.saveReport = async function(req, res) {
    let response = { saved: false, id: null }
    
    let { id } = req.params
    let { gov_staff_id } = req.user.id
    let { report, status } = req.body

    let query = 'insert into facility_inspections ( facility_id, gov_staff_id, report, status ) values( ??, ??, ??, ?? )'
    let [ result ] = await db.query(query, [ id, gov_staff_id, report, status ])

    if( result.affectedRows  == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}

// delete a facility
exports.delete = async function(req, res) {
    let response = { deleted: false } 
    let { id } = req.body

    if( req.user && req.user.staff_type !== 'REGULAR' ) {

        let query = 'delete from facilities where id = ?'
        let [ result ] = await db.execute(query, [ id ])

        if( result.affectedRows > 0 ) {
            response.deleted = true
        }

    }
    res.json(response)

}

// get details of a facility 
// its supervisor, inspections, kids, location etc..
exports.getDetails = async function(req, res) {
    let response = { facility: {}, supervisor: {}, kids: [] }
    let { id } = req.params 

    let facilityQuery = 'select * from facilities where id = ?'
    let supervisorQuery = 'select * from facility_supervisors where facility_id = ? limit 1 offset 0'
    let kidsQuery = 'select * from facility_kids where facility_id = ?'
    
    let [ facilityResult ] = await db.query(facilityQuery, [ id ])

    if( facilityResult.length > 0 ) {
        let [ supervisorResult ] = await db.query(supervisorQuery, [ facilityResult.id ])
        let [ kidsResult ] = await db.query(kidsQuery, [ facilityResult.id ])

        response.facility = facilityResult
        response.supervisor = supervisorResult 
        response.kids = kidsResult
    }
    res.json(response)

}


// get kids in a facility 
exports.getKids = async function(req, res) {
    let response = { kids: [], facility_kids: [] }
    let { id } = req.params 

    let query_1 = 'select * from facility_kids where facility_id = ?'
    let query_2 = 'select * from foster_kids where id in ( select foster_kid_id from facility_kids where facility_id = ? )'

    let [ result_1 ] = await db.query(query_1, [ id ])
    let [ result_2 ] = await db.query(query_2, [ id ])

    response.facility_kids = result_1
    response.kids = result_2

    res.json(response)

}

// get history of all kids in a facility 
exports.getKidsHistory = async function(req, res) {
    let response = { kids: [], facility_kids: [] }
    let { id } = req.params 

    let query_1 = 'select * from facility_kids where facility_id = ?'
    let query_2 = 'select * from foster_kids where id in ( select foster_kid_id from facility_kids where facility_id = ? )'

    let [ result_1 ] = await db.query(query_1, [ id ])
    let [ result_2 ] = await db.query(query_2, [ id ])

    response.facility_kids = result_1
    response.kids = result_2

    res.json(response)
}


// get supervisors of a facility -- the history
exports.getSupervisors = async function(req, res) {
    let response = { supervisors: [] }
    let { id } = req.params 

    let query = 'select * from facility_supervisors where facility_id = ?'
    let supQuery = 'select * from supervisors where id in ( select supervisor_id from facility_supervisors where facility_id = ? )'

    let [ result_1 ] = await db.query(query, [ id ])
    let [ result_2 ] = await db.query(supQuery, [ id ])

    let supervisors = result_2.map( (supervisor)=> {
        let history = result_1.filter( (res)=> res.supervisor_id == supervisor.id )
        return { supervisor: supervisor, history: history }
    })
    response.supervisors = supervisors

    res.json(response)
}

// get all facilities   
exports.getAll = async function(req, res) {
    let response = { facilities: [] }

    let query = 'select * from facilities'
    
    let [ result ] = await db.query(query)  
    response.facilities = result

    res.json(response)

}

// get all facilities in a city   
exports.getAllInCity = async function(req, res) {
    let response = { facilities: [] }
    let { city } = req.params

    let query = 'select * from facilities where city = ?'
    
    let [ result ] = await db.query(query, [ city ])  
    response.facilities = result

    res.json(response)
}

