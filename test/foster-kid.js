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

/*
    this is the test kid we are to add to the db to test
    save, if name is used, if we can get details, delete, get kids facilities, place the kid in a facility etc
*/
let kid_to_add_1 = {
        id: null, name: 'Kimmy Kenzo', gender: 'FEMALE', reason_here: 'un-healthy family'
    }
let kid_to_add_2 = {
        id: null, name: 'Emily Ochala', gender: 'FEMALE', reason_here: 'un-healthy family'
    }

/**
 * where a kid is placed
 */
let place_facility = {
    id: ""
}

/**
 * a staffer who is going to do priviledged operations like
 * adding a kid, deleting them etc 
 */
let auth_staff = {
    name: "kevin kemboi", password: "kevin123", token: ""
}
/**
 * a facility supervisor who is going to do priviledged operations like
 * adding a kid, deleting them etc 
 */
let auth_supervisor = {
    name: "wanjohi sane", password: "wanjohi123", token: ""
}

/*

  test foster kid routes
  
  routes

  POST  /   to add a new  kid
        data: name, dob, gender, reason_here 
        return { saved: Boolean, id: null|Number, errors: Array }

  DELETE  /   delete a kid
          data: id (record id)
          return  { deleted: Boolean }

  GET  /:id   check if a kid exists by their id
       data: {}
       return  { exists: Boolean, data: Object }

  GET  /:name/name-used   check if a kid name is used
       data: {}
       return  { used: Boolean, data: Object }


  GET  /:id   get details of a kid
       return  { history: Array }


  GET  /:id   get facilities a kid has been to
       return  { facilities: Array }


  GET  /:id/place   place a kid in a facility
       return  { placed: Boolean, id: String|null, errors: Array }

*/  
describe('Foster Kid Routes /api/kid', function() {
   
    this.timeout(36000)

    // authenticate a gov staffer and get a token to use while doing restrcited functions
    before('before foster kid route tests', async function() {


        /*
        try {
            
            // get a jwt token for the supervisor to use for requests
            let sup_data = { name: auth_supervisor.name, password: auth_supervisor.password }
            let sup_res = await request.post('/api/supervisor/login').send(sup_data) 
            let sup_retrn = sup_res.body
            auth_supervisor.token = sup_retrn.token


        } catch (error) {
            console.log('error ', error)
        }
        
        try {

            // get a jwt token for the staffer to use for requests
            let data = { name: auth_staff.name, password: auth_staff.password }
            let res = await request.post('/api/gov-staff/login').send(data) 
            let retrn = res.body
            auth_staff.token = retrn.token

        } catch(e) {
            console.log('erros', e)
        }
        */
      
        // done()
    })

    
    describe('POST /', async function () {

        it('ensure authentication token is prodided in request', async function() {

            let kid_to_add = kid_to_add_1
            let res = await request.post('/api/kid/').send(kid_to_add)

            expect(res).to.have.status(401)

        })


        it('ensure adding a record is done successfully [by a government staffer]', async function() {
            
            // get a jwt token for the staffer to use for requests
            let data = { name: auth_staff.name, password: auth_staff.password }
            let rez = await request.post('/api/gov-staff/login').send(data) 
            let retrn = rez.body
            auth_staff.token = retrn.token

            console.log('rez.body', rez.body)

            let kid_to_add = kid_to_add_1
            let res = await request.post('/api/kid/').set('Authorization', retrn.token).send(kid_to_add)
            let return_body = res.body

            expect(res).to.have.status(200)
            expect(return_body).to.be.an('Object')
            expect(return_body).to.have.property('saved').to.be.a('Boolean')
            expect(return_body).to.have.property('saved').to.be.true
            
            expect(return_body).to.have.property('id').to.be.an.integer()
            expect(return_body).to.have.property('id').and.to.not.be.null
            
            expect(return_body).to.have.property('errors').with.lengthOf(0)
            expect(return_body).to.have.property('errors').that.is.empty
            
            kid_to_add.id = return_body.id

        })

        
        it('ensure adding a record is done successfully [by a supervisor]', async function() {

            let kid_to_add = kid_to_add_2
            let res = await request.post('/api/kid/').set('Authorization', auth_supervisor.token).send(kid_to_add)
            let return_body = res.body

            expect(res).to.have.status(200)
            expect(return_body).to.be.an('Object')
            expect(return_body).to.have.property('saved').to.be.a('Boolean')
            expect(return_body).to.have.property('saved').to.be.true
            
            expect(return_body).to.have.property('id').to.be.an.integer()
            expect(return_body).to.have.property('id').and.to.not.be.null
            
            expect(return_body).to.have.property('errors').with.lengthOf(0)
            expect(return_body).to.have.property('errors').that.is.empty
            
            kid_to_add.id = return_body.id

        })


        
        it('ensure adding a record actually happens by checking if the id returns the kid', async function() {

            let kid_to_add = kid_to_add_1
            let res = await request.get(`/api/kid/${kid_to_add.id}/exists`)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(res).to.have.status(200)
        
            expect(body).to.have.property('exists').to.be.a('Boolean')
            expect(body).to.have.property('exists').to.be.true
        
            expect(body).to.have.property('data').to.be.an('Object')
            expect(body).to.have.property('data').to.include.all.keys('id', 'name', 'gender', 'dob', 'reason_here', 'verified_by', 'joined_on')
            expect(body).to.have.property('data')
                        .to.have.property('name').to.deep.equal(kid_to_add.name)

        })


        it('ensure right data is provided when adding')


    })


    describe('GET /:id/exists', async function () {

        it('check if a kid exists by id', async function() {

            let kid_id = kid_to_add_1.id
            let res = await chai.request(server).get(`/api/kid/${kid_id}/exists`)
            
            let body = res.body
            expect(body).to.be.an('Object')
            expect(body).to.have.property('exists').and.to.be.a('Boolean')
            expect(body).to.have.property('data').and.to.be.a('Object')

            expect(body).to.have.property('exists', true)
            expect(body).to.have.property('data')
                        .and.to.include.all.keys('id', 'name', 'gender', 'dob', 'verified_by', 'joined_on')

        })

    })


    describe('GET /:name/name-used', async function () {

        it('check if a kid name is used', async function() {

            let kid_to_add = kid_to_add_1
            let kid_name = kid_to_add.name
            let res = await request.get(`/api/kid/${kid_name}/name-used`)

            let body = res.body
            expect(body).to.be.an('Object')

            expect(body).to.have.property('used').and.to.be.true
            expect(body).to.have.property('used').and.to.be.a('Boolean')
            expect(body).to.have.property('used', true)

        })

    })


    describe('GET /:id', async function () {

        it('get details of a kid', async function() {

            let kid_to_add = kid_to_add_1
            let kid_id = kid_to_add.id
            let res = await request.get(`/api/kid/${kid_id}`)
        
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('kid').and.to.be.an('Object')
            expect(body).to.have.property('kid').and.to.include.all.keys('id', 'name', 'dob', 'gender', 'verified_by', 'joined_on')

        })

    })


    describe('GET /:id/facilities', async function () {

        it('get facilities a kid has been to', async function() {

            let kid_to_add = kid_to_add_1
            let kid_id = kid_to_add.id
            let res = await request.get(`/api/kid/${kid_id}/facilities`)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('facilities').and.to.be.an('Array')

        })

    })


    describe.skip('GET /:id/place', async function () {

        before('before placing a kid get a facility')

        it('place a kid in a facility', async function() {

            let kid_to_add = kid_to_add_1
            let kid_id = kid_to_add.id
            let res = await request.get(`/api/kid/${kid_id}/place`)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('placed').and.to.be.a('Boolean')
            expect(body).to.have.property('id').and.to.be.an.integer()
            expect(body).to.have.property('id').and.to.not.be.null
            expect(body).to.have.property('errors').and.to.be.a('Array')
            expect(body).to.have.property('placed', true)
            expect(body).to.have.property('errors').and.to.be.deep.equal([])

        })

    })



    describe.skip('DELETE /', async function () {

        it('ensure record deletion works', async function() {
            
            let kid_to_add = kid_to_add_1
            let data = { id: kid_to_add.id }
            let res = await request.delete(`/api/kid`).send(data)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('deleted').to.be.false
            expect(body).to.have.property('deleted', false)

        })


        
        it('ensure the kid was really deleted', async function() {
            
            let kid_to_add = kid_to_add_1
            let kid_id = kid_to_add.id
            let res = await request.get(`/api/kid/${kid_id}/exists`).send(data)
            let body = res.body

            expect(body).to.be.an('Object')
            expect(body).to.have.property('exists').to.be.a('Boolean')
            expect(body).to.have.property('data').to.be.a('Object')

            expect(body).to.have.property('exists', true)
            expect(body).to.have.property('data')
                        .to.include.all.keys('id', 'name', 'gender', 'dob', 'verified_by', 'joined_on')

        })

    })

    
})

