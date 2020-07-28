const express = require('express')
const router = express.Router()
const { createUser } = require('./controller/account/user')
const { addProduct } = require('./controller/inventory/inventory')
const { createOrder } = require('./controller/order/createOrder')


/**Health check */
router.get('/', (req, res) => {
  res.send({ succes: true, msg: 'Server is up and running'})
})

/**Creating order */
router.post('/createOrder' ,(req, res) => {
  createOrder(req, res)
})


/**The routes below are used to populate the data for user and products*/
router.post('/createAccount', (req, res) => {
  createUser(req, res)
})

router.post('/addProduct', (req, res) => {
  addProduct(req, res)
})

module.exports = router