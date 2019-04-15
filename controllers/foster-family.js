// external libraries imports
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

// internal modules/libraries imports
var db = require('../config/mysql')
var AppVars = require('../config/vars')


// save a foster kid
exports.save = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    let { 
          parent_1_id, parent_2_id, parent_1_name, parent_2_name, parent_1_phone, parent_2_phone, 
          parent_1_email, parent_2_email, city, password, confirmationPassword 
        } = req.body 
    let verified_by = null

    
    if( !password || password !== confirmationPassword ) {
        response.errors.push({ password: 'passwords must match' })
        return res.json(response)
    }
    let passwordHash = bcrypt.hashSync(password, 10)

    let query = `insert into foster_families
                  ( parent_1_id, parent_2_id, parent_1_name, parent_2_name, parent_1_phone, parent_2_phone, 
                  parent_1_email, parent_2_email, city, verified_by, password  ) 
                  values ( ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ? )`
    let [ result ] = await db.execute(query, [ 
                                       parent_1_id, parent_2_id, parent_1_name, parent_2_name, 
                                       parent_1_phone, parent_2_phone, parent_1_email, parent_2_email, city,
                                       verified_by, passwordHash 
                        ])

    if( result.affectedRows == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }
    res.json(response)

}

// verify a foster family
exports.verify = async function(req, res) {
    let response = { verified: false }
    let { id } = req.body 
    let verified_by = req.user.id

    let query = 'update foster_families set verified_by = ? where id = ?'
    let [ result ] = await db.execute(query, [ verified_by, id ])

    if( result.affectedRows == 1 ) {
        response.verified = true 
    }
    res.json(response)

}

// delete a foster family
exports.delete = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.body 

    let query = 'delete from foster_families where id = ?'
    let [ result ] = db.execute(query, [ id ])

    if( result.affectedRows == 1 ) {
        response.deleted = true 
    }
    res.json(response)

}


// get details of a foster family
exports.getDetails = async function(req, res) {
    let response = { family: {} }
    let id = req.params.id 

    let query = 'select * from foster_families where id = ?'
    let staffQuery = 'select * from gov_staff where id = ?'
    let [ rows, fields ] = await db.execute(query, [ id ])

    if( rows && rows.length > 0 ) {
        let staff = null
        let fam = rows[0]
        let { password, ...familia } = fam

        let [ staffResult ] = await db.execute(staffQuery, [ familia.verified_by ])
        if( staffResult && staffResult[0] ) {
            let { password, ...staffer } = staffResult[0]
            staff = staffer
        }

        response.family = familia
        response.family.verifier = staff
    }
    res.json(response)
}


// get kids who have been in this foster family 
exports.getKids = async function(req, res) {
    let response = { kids: {} }
    let id = req.params.id 

    let query = 'select * from foster_family_kids where foster_kid_id = ?'
    let kidsQuery = 'select * from foster_kids where id in ( select foster_kid_id from foster_family_kids where foster_kid_id = ? )'
    let [ rows, fields ] = await db.execute(query, [ id ]);
    let [ kidz ] = await db.execute(kidsQuery, [ id ]);

    let kids = rows.map(  (row)=> {
        let kid = kidz.find( (kd)=> kd.id == row.foster_kid_id )
        return { kid, record: row }
    })
    response.kids = kids 
    
    res.json(response)
}


// get reports that have been made for this foster family 
exports.getReports = async function(req, res) {
    let response = { reports: {} }
    let id = req.params.id 

    if( req.user.user_type !== 'SUPERVISOR' ) {
        let query = 'select * from family_inspections where family_id = ?'
        let [ rows, fields ] = await db.execute(query, [ id ]);
        response.reports = rows 
    }
    
    res.json(response)
}


// login a family 
exports.login = async function(req, res) {
    
    let response = { token: null, user: {} }

    if( req.user && req.user.id ) {

        let token_data = { id: req.user.id, type: 'FAMILY', timestamp: Date.now() }
        let token = jwt.sign({ data: token_data }, AppVars.jwt.secret)
        response.token = token 
        response.user = req.user 

    }
    res.json(response)
    
}