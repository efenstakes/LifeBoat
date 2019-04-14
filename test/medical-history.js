// include required test libraries
let chai = require('chai')
let chaihttp = require('chai-http')
let chaiinteger = require('chai-integer')
let fetch = require('node-fetch')

var expect = chai.expect
var server = require('../index')

chai.use(chaihttp)
chai.use(chaiinteger)
let request = chai.request(server)

/**
 * the kid whose history we will add during testing
 */
let target_kid = {}
let added_history_id = null

/**
 * a staffer who is going to do priviledged operations like
 * adding a medical record, deleting them etc 
 */
let auth_staff = {
    name: "kevin kemboi", password: "kevin123", token: ""
}
/**
 * a facility supervisor who is going to do priviledged operations like
 * adding a medical record, deleting them etc 
 */
let auth_supervisor = {
    name: "wanjohi sane", password: "wanjohi123", token: ""
}


/*

  test medical history routes
  
  routes

  POST  /   to add a new record for a kid
        data: kid_id, disease, description, hospital 
        return { saved: Boolean, id: null|Number, errors: Array }

  PUT   /   update an existing record for a kid
        data: id (record id), well_on
        return { updated: Boolean, errors: Array }

  DELETE  /   delete a kids medical record
          data: id (record id)
          return  { deleted: Boolean, errors: Array }

  DELETE  /kid/:id/all   delete all kids medical record
          data: id (record id)
          return  { deleted: Boolean, errors: Array }

  GET  /:id   get a kids medical history
       data: id (kids id)
          return  { history: Array }

*/
describe.skip('Medical History Routes /api/medical-history', async function() {

    before('before medical history route tests', async function() {
        
        // get a kid to work with for the requests
        let res = await request.get('/api/kids/all')
        target_kid = res.body.kids[0]

        // get token for our supervisor to use for requests
        let auth_supervisor_data = { name: auth_supervisor.name, password: auth_supervisor.password }
        let supervisor_auth_res = await request.post('/api/supervisor/login').send(auth_supervisor_data)
        auth_supervisor.token = supervisor_auth_res.body.token

        // get token for our staffer to use for requests
        let auth_staffer_data = { name: auth_staff.name, password: auth_staff.password }
        let staff_auth_res = await request.post('/api/supervisor/login').send(auth_staffer_data)
        auth_staff.token = staff_auth_res.body.token

    })

    
    describe('POST /', async function () {

        it('ensure adding a record is done successfully', async function() {

            let history = {
                kid_id: target_kid.id, disease: 'malaria', description: 'he was ill and ill and ill', 
                hospital: 'nairobi west hospital', ill_on: '2019-04-01 00:00:00'
            }
            let res = await request.post('/api/medical-history/').send(history)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('saved').to.be.a('Boolean')
            expect(body).to.have.property('errors').to.be.an('Array')
            expect(body).to.have.property('errors').to.deep.equal([])

            expect(body).to.have.property('saved', true)
            expect(body).to.have.property('id').and.to.not.be.null
            expect(body).to.have.property('errors').with.lengthOf(0)
            
            added_history_id = body.id

        })


        it('ensure right data is provided when adding', async function() {

            let history = { 
                    kid_id: '', disease: '', description: '', hospital: '' }
            let res = await request.post('/api/medical-history/').send(history)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('saved').to.be.a('Boolean')
            expect(body).to.have.property('errors').to.be.an('Array')
            expect(body).to.have.property('errors').to.not.deep.equal([])

            expect(body).to.have.property('saved', true)
            expect(body).to.have.property('id').and.to.be.null
            
        })


    })

    describe('PUT /', async function () {

        it('ensure updating a record is done successfully', async function() {

            let history = { 
                id: added_history_id, well_on: '2019-04-21 00:00:00' 
            }
            let res = await request.put('/api/medical-history/').send(history)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('updated').to.be.a('Boolean')
            expect(body).to.have.property('errors').to.be.an('Array')
            expect(body).to.have.property('updated', true)
            expect(body).to.have.property('errors').with.lengthOf(0)

        })


        it('ensure right data is provided when updating a record', async function() {

            let history = { id: '', well_on: '', disease: '', description: '' }
            let res = await request.put('/api/medical-history/').send(history)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('updated').to.be.a('Boolean')
            expect(body).to.have.property('errors').to.be.an('Array')
            expect(body).to.have.property('updated', false)
            expect(body).to.have.property('errors').to.not.be.empty

        })


    })




    

    describe('GET /kid/:id', async function () {

        it('get all records of a kid', async function() {

            let kid_id = target_kid.id
            let res = await request.get(`/api/medical-history/kid/${kid_id}`)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('history').and.to.be.an('Array')

        })

    })




    describe('DELETE /', async function () {

        it('ensure record deletion works', async function() {

            let data = { id: added_history_id }
            let res = await request.delete(`/api/medical-history/`).send(data)
            let body = res.body

            expect(body).to.be.an('Object')

            expect(body).to.have.property('deleted').to.be.a('Boolean')
            expect(body).to.have.property('errors').to.be.an('Array')

            expect(body).to.have.property('deleted', true)
            expect(body).to.have.property('errors').with.lengthOf(0)

        })

        
        it('delete all history of a kid', async function() {

            let data = { } 
            let res = await request.delete(`/api/medical-history/kid/${target_kid.id}/all`).send(data)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('deleted').to.be.a('Boolean')
            
            expect(body).to.have.property('deleted', true)

        })


        it('check that all records of a kid are deleted; history array should be empty', async function() {

            let kid_id = target_kid.id
            let res = await request.get(`/api/medical-history/kid/${kid_id}`)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('history').and.to.be.an('Array')
            expect(body).to.have.property('history').and.to.be.empty

        })


    })



})

