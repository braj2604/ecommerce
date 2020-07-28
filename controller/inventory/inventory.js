const Inventory = require('../../models/inventory')

async function addProduct(req, res) {
  try {
    const { body } = req
    const obj = {
      productName: body.productName,
      quantityAvailable: body.quantityAvailable,
      price: body.price
    }
    const product = Inventory.build(obj)
    await product.save()
    res.send({succes: true})
  } catch(err) {
    console.log('err', err)
    throw new Error(err)
  }
}

module.exports = {
  addProduct
}