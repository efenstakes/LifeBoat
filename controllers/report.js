// external libraries import

// internal modules imports
var db = require('../config/mysql')


// write report when a facility is checked
exports.saveForFacility = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    
    let { gov_staff_id } = req.user.id
    let { facility_id, public_report, private_report, status } = req.body

    let query = 'insert into facility_inspections ( facility_id, gov_staff_id, public_report, private_report, status ) values( ??, ??, ??, ?? )'
    let [ result ] = await db.query(query, [ facility_id, gov_staff_id, public_report, private_report, status ])

    if( result.affectedRows  == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}


// get public reports of a facility
exports.getPublicFacilityReports = async function(req, res) {
    let response = { reports: [] }
    
    let { id } = req.params

    let query = 'select * from facility_inspections where facility_id = ?'
    let govStaffQuery = 'select * from gov_staff where id = ?'
    let supervisorQuery = 'select * from supervisors where id = ?'

    let [ result ] = await db.execute(query, [ id ])

    let reports = []
    for (const facility_inspection in result) {
        let { private_report, ...inspection } = facility_inspection

        let [ govStaffResult ] = await db.execute(govStaffQuery, [ facility_inspection.gov_staff_id ])
        let [ supervisorResult ] = await db.execute(supervisorQuery, [ facility_inspection.supervisor_id ])
        let combo = { inspection: inspection, gov_staff: govStaffResult, supervisor: supervisorResult }        
        reports.push(combo)
    }
    response.reports = reports

    res.json(response)
}

// get all reports of a facility (public and private)
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
    response.reports = reports

    res.json(response)
}



// write report when a supervisor is checked
exports.saveForSupervisor = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    
    let { gov_staff_id } = req.user.id
    let { supervisor_id, facility_id, public_report, private_report, status } = req.body

    let query = 'insert into supervisor_inspections ( supervisor_id, facility_id, gov_staff_id, public_report, private_report, status ) values( ?, ?, ?, ?, ? )'
    let [ result ] = await db.query(query, [ supervisor_id, facility_id, gov_staff_id, public_report, private_report, status ])

    if( result.affectedRows  == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }

    res.json(response)
}


// get public reports of a supervisor
exports.getPublicSupervisorReports = async function(req, res) {
    let response = { reports: [] }
    
    let { id } = req.params

    let query = 'select * from supervisor_inspections where facility_id = ?'
    let govStaffQuery = 'select * from gov_staff where id = ?'
    let facilityQuery = 'select * from facilities where id = ?'

    let [ result ] = await db.execute(query, [ id ])

    let reports = []
    for (const facility_inspection in result) {
        let { private_report, ...inspection } = facility_inspection

        let [ govStaffResult ] = await db.execute(govStaffQuery, [ facility_inspection.gov_staff_id ])
        let [ facilityResult ] = await db.execute(facilityQuery, [ facility_inspection.facility_id ])
        let combo = { inspection: inspection, gov_staff: govStaffResult, facility: facilityResult }
        reports.push(combo)
    }
    response.reports = reports

    res.json(response)
}


// get all reports of a supervisor ( public and private )
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
    response.reports = reports

    res.json(response)
}



// write report for a foster kid
exports.saveForKid = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    
    let user = req.user
    let maker_id = user.user.id 
    let maker_type = user.user_type 

    let { foster_kid_id, public_report, private_report, status } = req.body

    let query = 'insert into supervisor_inspections ( foster_kid_id, maker_id, maker_type, public_report, private_report, status ) values( ?, ?, ?, ?, ? )'
    let [ result ] = await db.query(query, [ foster_kid_id, maker_id, maker_type, public_report, private_report, status ])

    if( result.affectedRows  == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }

    res.json(response)
}


// get public reports of a kid
exports.getPublicKidReports = async function(req, res) {
    let response = { reports: [] }
    
    let { id } = req.params
    let query = 'select * from kid_reports where foster_kid_id = ?'

    let [ result ] = await db.execute(query, [ id ])

    let reports = []
    for (const kid_inspection in result) {
        let { private_report, ...inspection } = kid_inspection
        let maker = {}
        let maker_query = ''

        if( kid_inspection['maker_type'] == 'GOV_STAFF' ) {
          maker_query = 'select * from gov_staff where id = ?'
          let [ gov_staff ] = await db.query(maker_query, [ kid_inspection.maker_id ])
          maker = gov_staff[0]
        } else {
            maker_query = 'select * from supervisors where id = ?'
            let [ supervisor ] = await db.query(maker_query, [ kid_inspection.maker_id ])
            maker = supervisor[0]
        }         
        let combo = { inspection, maker }
        reports.push(combo)
    }
    response.reports = reports

    res.json(response)
}


// get all reports of a kid ( public and private )
exports.getKidReports = async function(req, res) {
    let response = { reports: [] }
    
    let { id } = req.params
    let query = 'select * from kid_reports where foster_kid_id = ?'

    let [ result ] = await db.execute(query, [ id ])

    let reports = []
    for (const kid_inspection in result) {
        let maker = {}
        let maker_query = ''

        if( kid_inspection['maker_type'] == 'GOV_STAFF' ) {
          maker_query = 'select * from gov_staff where id = ?'
          let [ gov_staff ] = await db.query(maker_query, [ kid_inspection.maker_id ])
          maker = gov_staff[0]
        } else {
            maker_query = 'select * from supervisors where id = ?'
            let [ supervisor ] = await db.query(maker_query, [ kid_inspection.maker_id ])
            maker = supervisor[0]
        }         
        let combo = { inspection: kid_inspection, maker }
        reports.push(combo)
    }
    response.reports = reports

    res.json(response)
}

