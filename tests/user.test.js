const request = require('supertest')
const app = require('../src/app')

test( 'Should sign up a new user', async () => {
  await request(app).post( '/users' ).send({
    name: 'sergio',
    email: 'sergio@example.com',
    password: "sergio12354"
  }).expect(201)
} )







