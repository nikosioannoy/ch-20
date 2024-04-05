const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

let addressSchema = new Schema({ //Schema gia address, einai document // _id:false gia na mhn valei ID h MongoDB
  area: { type: String},
  road: { type: String}
}, {_id:false})

let phoneSchema = new Schema({
  type: { type: String },
  number: { type: String }
}, {_id: false})

let productsSchema = new Schema({
  product: { type: String},
  cost: { type: Number},
  quantity: { type: Number},
  date: { type: Date, default: Date.now }
})

let userSchema = new Schema({
  username: {
    type: String, //Pedio Username tipou string, edw elegxoume gia to username pou tha dothei
    required: [true, 'Username is required field'],
    maxLength: 20,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
    maxLength:20,
    minLength:6
  },
  name: {type: String},
  surname: {type: String},
  email: {
    type: String,
    required: [true, 'Email is required field'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is not valid'] 
  },
  address: addressSchema,
  phone: { type: [phoneSchema], null: true }, //Epeidh einai Schema to dilonoume apo PANW, null true gia na mporei na mhn dosei tipota alliws perimenei
  products: { type: [productsSchema], null: true}

}, {
  collection: 'users', //prosdiorizoume gia poia collection theloume to paron Schema
  timestamps: true
})


userSchema.plugin(uniqueValidator) //Prin kanei save to Schema elegxei an oti exoume xaraktirisei os unique, einai ontos unique se sxesh me alla documents (ta elegxei ola) 

module.exports = mongoose.model('User', userSchema) //Gia xrisi se alla files, meso tou 'User'