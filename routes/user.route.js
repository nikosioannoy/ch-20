const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller') //pare access stis function ston user.controller ARA mporoume na kalesoume thn find all tou

//An erthei entolh get, fernei olous tous users // sto userController prepei na yparxei h sinartisi findAll
router.get ('/', userController.findAll) 
router.get('/:username', userController.findOne)
router.post('/', userController.create)
router.patch('/:username', userController.update)
router.delete('/:username', userController.delete)

module.exports = router //Export tis diadikasies (edw einai na paei ston user.controller)