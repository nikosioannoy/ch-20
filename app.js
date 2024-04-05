const express = require('express')
const app = express()
// const port = 3000
const mongoose = require("mongoose")

require('dotenv').config()
app.use(express.json()) //Gia diavasma JSON

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')



//Timi vazoume to connection string gia thn vash mas apo MongoDB Atlas.
mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => {console.log("Connection to mongodb established")},
    err => ( console.log("Failed to connect to mongo db", err) )
    ) 

const cors = require('cors')
app.use(cors({
  origin: '*'//Dinw stoixeia se olous
  // origin:['http://localhost:8000', 'http://www.aueb.gr'] //Epitrepw calls apo autous
}))


const user = require('./routes/user.route') //Otan sou erxete klisi me /api/user (apo katw akrivos), tote kalese tis diadikasies tou user (diladi user.route)
const userProduct = require('./routes/user.products.routes')
const product = require('./routes/product.route')

app.use('/', express.static('files'))//Klhsh se localhost - anoigei ton fakelo files Gia na ftiaksoume front end
app.use('/api/users', user) //Otan dei /api/user - To paei ston user (pou opws vlepoume apo panw exei oles tis leitourgies tou user.route) 
app.use('/api/user-products', userProduct) //Dromologisi sto route tou userProduct - (user.products.routes)   

app.use('/api-docs',
 swaggerUi.serve, //anoikse server gia swagger
  swaggerUi.setup(swaggerDocument.options)
   //to options auto iparxei sto swagger.js 
                     ) 

app.use('/api/products', product)

// app.listen(port, () => {
//   console.log("Server is up")
// })

module.exports = app