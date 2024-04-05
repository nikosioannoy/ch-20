const User = require('../models/user.model')

exports.findAll = async(req, res) => {
  console.log("Find all users products")

  try {
    const result = await User.find({},{_id:0, username:1, products:1}) //Epistrefei mono Username kai products gia OLOUS tous user
    res.status(200).json({data: result})
    console.log("Reading all users products")
  } catch(err) {
    res.status(400).json({data:err})
    console.log("Problem in reading users products")
  }
}

exports.findOne = async(req, res) => {
  const username = req.params.username //Pernoume to username pou stelnoume mesw URI
  console.log("Find products for user: ", username)

  try {
    const result = await User.findOne({username: username}, {_id:0, username:1, products: 1})
    res.status(200).json({data: result}) //Emfanish apotelesmatwn
    console.log("Success in finding products for user", username)
  } catch(err) {
    res.status(400).json({data: err})
    console.log("Problem in finding products ", username)
  }
}

exports.create = async(req, res) => {
  const username = req.body.username
  const products = req.body.products

  console.log("Inserting products for user", username)

  try {
    const result = await User.updateOne(
      {username: username}, //Filtro anazhthshs
      {
        $push: {
          products: products //Vale to products pou exei erthei apo to req.body.products
        }
      } 
    )
    res.status(200).json({data: result})
    console.log('Success insert')
  } catch(err) {
    res.status(400).json({data:err})
    console.log("Failed insertion")
  }
}

exports.update = async(req, res) => {
  const username = req.params.username //Stelnoume username xrhsth kai peirazoume products tou
  const _id = req.body.product._id //edw epilegoume apo to JSON call pou tha kanoume 
  const quantity = req.body.product.quantity

  console.log("Update product for user", username)

  try {
    const result = await User.updateOne(
      {username: username, "products._id": _id}, //Edw theloume anazhthsh kai kane update - Epelekse user me username = username / Epelekse subdocument (product) me id = id
      {
        $set: {
          "products.$.quantity": quantity //products.$ einai h thesh pou vrike apo panw me to id
                                          //product.(thesh pou vrike me product id).quantity vale to kainourio quantity 
        }
      }
    )
    res.status(200).json({data: result})
    console.log("Success in updating product")
  } catch(err) {
    res.status(400).json({data: err})
    console.log("Problem in updating product", username)
  }
}

//Delete subdocument kanoume edw (delete product apo user) gi auto updateone
exports.delete = async(req, res) => {
  const username = req.params.username
  const _id = req.params.id

  console.log("Delete product")

  try {
    const result = await User.updateOne(
      {username: username}, 
      {
        $pull: {
          products: {_id: _id} //Svise apo products opoio exei id = id pou esteila
        }
      }
    )
    res.status(200).json({data: result})
    console.log("Success in updating product")
  } catch(err) {
    res.status(400).json({data: err})
    console.log("Problem in updating product", username)
  }
}