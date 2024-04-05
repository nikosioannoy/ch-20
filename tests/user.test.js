const mongoose = require('mongoose')
const request = require('supertest')
const helper = require('../helpers/user.helper')

const app = require('../app') //Apo edw tha diavasei tis kliseis

require('dotenv').config()

beforeEach(async () => { //Prin kathe test kane syndesh sthn BASH
  await mongoose.connect(process.env.MONGODB_URI) //Sindesh sthn MONGODB bash mas
  .then(
    () => { console.log("Connection to MongoDB established")},
    err => { console.log("Failed to connect to MongoDB", err)}
  )
})

afterEach(async ()=>{ //Meta apo kathe test kleise BASH
  await mongoose.connection.close()
})

describe("GET Request /api/users", () => { //Describe einai group apo tests / gia kathe /api/users
  test("Returns all users", async () => { //Sintomia tou test - it
    const res = await request(app).get('/api/users') //Anoikse arxeio app.js kane get call /api/users.
    expect(res.statusCode).toBe(200)//Vash user.controller OK statuscode einai 200
    expect(res.body.data.length).toBeGreaterThan(0)//An pinakas me data den einai adeios
  }, 10000) 
})

describe("GET Request /api/users/:username", () =>{
  test("Returns a user", async()=>{
    const result = await helper.findLastInsertedUser()
    console.log(result)
    const res = await request(app).get('/api/users/' + result.username)
    expect(res.statusCode).toBe(200)
    expect(res.body.data.username).toBe(result.username)
    expect(res.body.data.email).toBe(result.email)

  }, 10000)
})

describe("Request POST /api/users", () => {
  test('Creates a user', async () => {
    const res = await request(app)
    .post('/api/users')
    .send({
      username: "test",
      password: "123456",
      name: "Kostas",
      surname: "Kostakis",
      email: "test@aueb.gr"
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toBeTruthy() //Apla na girisei kati
  }, 10000)

  test('Creates a user testing password length', async () => {
    const res = await request(app)
    .post('/api/users')
    .send({
      username: "test",
      password: "123",
      name: "Kostas",
      surname: "Kostakis",
      email: "test@aueb.gr"
    })
    expect(res.statusCode).toBe(400) //Edw perimenoume na kanei lathos ara 400
    expect(res.body.data).toBeTruthy() //Apla na girisei kati
  }, 10000)

  test('Creates a user testing username and email', async () => {
    const res = await request(app)
    .post('/api/users')
    .send({
      username: "test",
      password: "123456",
      name: "Kostas",
      surname: "Kostakis",
      email: "test@aueb.gr"
    })
    expect(res.statusCode).toBe(400) //Edw perimenoume na kanei lathos ara 400
    expect(res.body.data).toBeTruthy() //Apla na girisei kati
  }, 10000)
})

describe("DELETE /api/users/:username", () => {
  test("Delete last inserted user", async () => {
    const result = await helper.findLastInsertedUser()
    const res = await request(app).delete('/api/users/' + result.username)

    expect(res.statusCode).toBe(200)
  },10000)
})


