// external libraries import

// internal modules imports
var db = require('../config/mysql')


// write report when a facility is checked
exports.saveForFacility = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    
    let { gov_staff_id } = req.user.id
    let { facility_id, report, status } = req.body

    let query = 'insert into facility_inspections ( facility_id, gov_staff_id, report, status ) values( ??, ??, ??, ?? )'
    let [ result ] = await db.query(query, [ facility_id, gov_staff_id, report, status ])

    if( result.affectedRows  == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}


// get reports of a facility
exports.getFacilityReports = async function(req, res) {
    let response = { reports: [] }
    
    let { id } = req.params

    let query = 'select * from facility_inspections where facility_id = ?'
    let govStaffQuery = 'select * from gov_staff where id = ?'
    let supervisorQuery = 'select * from supervisors where id = ?'

    let [ result ] = await db.execute(query, [ id ])

    let reports = []
    for (const facility_inspection in result) {
        let [ govStaffResult ] = await db.execute(govStaffQuery, [ facility_inspection.gov_staff_id ])
        let [ supervisorResult ] = await db.execute(supervisorQuery, [ facility_inspection.supervisor_id ])
        let combo = { inspection: facility_inspection, gov_staff: govStaffResult, supervisor: supervisorResult }        
        reports.push(combo)
    }
    /*
    let reports = result.map( async function(facility_inspection) {

        let [ govStaffResult ] = await db.execute(govStaffQuery, [ facility_inspection.gov_staff_id ])
        let [ supervisorResult ] = await db.execute(supervisorQuery, [ facility_inspection.supervisor_id ])
        return { inspection: facility_inspection, gov_staff: govStaffResult, supervisor: supervisorResult }

    })
    */

    response.reports = reports

    res.json(response)
}


// write report when a supervisor is checked
exports.saveForSupervisor = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    
    let { gov_staff_id } = req.user.id
    let { supervisor_id, facility_id, report, status } = req.body

    let query = 'insert into supervisor_inspections ( supervisor_id, facility_id, gov_staff_id, report, status ) values( ?, ?, ?, ?, ? )'
    let [ result ] = await db.query(query, [ supervisor_id, facility_id, gov_staff_id, report, status ])

    if( result.affectedRows  == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}


// get reports of a supervisor
exports.getSupervisorReports = async function(req, res) {
    let response = { reports: [] }
    
    let { id } = req.params

    let query = 'select * from supervisor_inspections where facility_id = ?'
    let govStaffQuery = 'select * from gov_staff where id = ?'
    let facilityQuery = 'select * from facilities where id = ?'

    let [ result ] = await db.execute(query, [ id ])

    let reports = []
    for (const facility_inspection in result) {
        let [ govStaffResult ] = await db.execute(govStaffQuery, [ facility_inspection.gov_staff_id ])
        let [ facilityResult ] = await db.execute(facilityQuery, [ facility_inspection.facility_id ])
        let combo = { inspection: facility_inspection, gov_staff: govStaffResult, facility: facilityResult }
        reports.push(combo)
    }
    /*
    let reports = result.map( async function(facility_inspection) {

        let [ govStaffResult ] = await db.execute(govStaffQuery, [ facility_inspection.gov_staff_id ])
        let [ facilityResult ] = await db.execute(facilityQuery, [ facility_inspection.facility_id ])
        return { inspection: facility_inspection, gov_staff: govStaffResult, facility: facilityResult }

    })
    */

    response.reports = reports

    res.json(response)
}
