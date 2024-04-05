const mongoose = require('mongoose')
const request = require('supertest')
const helper = require('../helpers/product.helper')

const app = require('../app')

require('dotenv').config()

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => { console.log("Connection to MongoDB established")},
    err => { console.log("Failed to connect to MongoDB", err)}
  )
})

afterEach(async () => {
  await mongoose.connection.close()
})

describe("GET Request /api/products", () => {
  test("Returns all products", async () => {
    const res = await request(app).get('/api/products')
    expect(res.statusCode).toBe(200)
    expect(res.body.data.length).toBeGreaterThan(0)
  }, 10000)
})

describe("GET Request /api/products/:product", () =>{
  test("Returns a product", async () => {
    const result = await helper.findLastInsertedProduct()
    console.log(result)
    const res = await request(app).get('/api/products/' + result.product)
    expect(res.statusCode).toBe(200)
    expect(res.body.data.product).toBe(result.product)
  }, 10000)
})

describe("Request POST /api/products", () => {
  test('Creates a product', async () => {
    const res = await request(app)
    .post('/api/products')
    .send({
      product: "test product",
      cost: "420",
      description: "Description Test",
      quantity: "33"
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toBeTruthy()
  }, 10000)

  test('Creates a product testing product-name length (min 3)', async () => {
    const res = await request(app)
    .post('/api/products')
    .send({
      product: "ab",
      cost: "100",
      description: "Desc Test",
      quantity: "20"
    })
    expect(res.status).toBe(400)
    expect(res.body.data).toBeTruthy()
  }, 10000)

  test('Creates a product testing for negative quantity', async () => {
    const res = await request(app)
    .post('/api/products')
    .send({
      product: "product",
      cost: "100",
      description: "Generic Desc",
      quantity: "-5"
    })
    expect(res.statusCode).toBe(400)
    expect(res.body.data).toBeTruthy()
  }, 10000)
})

describe("DELETE /api/products/:product", () => {
  test("Delete last inserted product", async () => {
    const result = await helper.findLastInsertedProduct()
    const res = await request(app).delete('/api/products/' + result.product)

    expect(res.statusCode).toBe(200)
  }, 10000)
})
