const User = require('../models/user.model') //require oti exei ginei export sto user.model
const logger = require('../logger/logger')


exports.findAll = async(req, res) => {
  console.log("Find all users")
  try {
  const result = await User.find() //await giati perimenoume na girisei auto to apotelesma / User vriskei tous Users apo thn DB(mongoDB) dioti exei kanei require to user.model (const User apo panw akrivos), to opoio anaferete sthn collection Users (to exoume grapsei katw katw sto user.model)
  res.status(200).json({data: result}) 
  logger.debug("Success in reading all users")
  logger.info("Success in reading all users")
  } catch (err) {
    console.log(`Problem in reading users ${err}`)
    logger.error(`Problem in reading all users , ${err}`)
  }
}

exports.findOne = async(req, res) => {
  console.log("Find one user")
    const username = req.params.username //apo user.route kseroume oti legetai username, req.params pernoume path parameters
    try {
      const result = await User.findOne({ username: username}) //Edw mpainei h parametros pou dinei o xrhsths
      res.status(200).json({data: result})
    } catch (err) {
      console.log(`Problem in reading user, ${err}`)
    }
}

exports.create = async(req, res) => {
  console.log("Insert one user")
  console.log(req.body) //req.body diavazoume auta pou esteile o postman (stelnei olokliro object user) - req einai to request pou mas erxetai
  
  const newUser = new User ({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    products: req.body.products
  }) //Apothikeuoume sto newUser sta pedia pou mas irthan me to req.

  try{
    const result = await newUser.save() //Apothikeush sthn DB - await = otan oloklirothei 
    res.status(200).json({data: result})
    console.log("User saved")
  } catch(err) {
    res.status(400).json({data: err})
    console.log("Problem in saving user")
  }
}

exports.update = async(req, res) => {
  const username = req.params.username

  console.log('Update user with username: ', username)

  const updateUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  }

  try {
    const result = await User.findOneAndUpdate(
      {username: username}, //Kalei vash username - apothikeush tou username se username metavlith
      updateUser, //An ton vreis (vash username) tote kane to updateUser (apo panw)
      {new: true} //An o xrhsths den iparxei - ftiaxton
    )
    res.status(200).json({data: result})
    console.log("Success in updating user", username)
  } catch(err){
    res.status(400).json({data: err})
    console.log("Problem in updating user: ", user)
  }
}

exports.delete = async(req, res) => {
  const username = req.params.username;
  console.log("Delete User: ", username)
  
  try {
    const result = await User.findOneAndDelete({username: username})
    //Edw tha vazame elegxo px an result adeio error
    res.status(200).json({data: result})
    console.log("User Successfully Deleted", username)
  } catch(err) {
    res.json({data: err})
    console.log("Problem in deleting user")
  }

}