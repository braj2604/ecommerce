const sequelize = require('sequelize')
const Order = require('../../models/order')
const OrderDetail = require('../../models/orderDetails')
const Inventory = require('../../models/inventory')
const db = require('../../config/db.config')

async function createOrder(req, res) {
  /**
   * Transactions are used here as there are multiple queries fired during 
   * creation of order and we need "ALL OR NONE" behavior
   */
  const t = await db.transaction()
  try {
    /**
     * Here userId is sent from body because there is no authentication in place,
     * so no way of identifying the user. Been in production this data would have
     * been extractred from user session
     */

    const { body } = req
    const orderDetailsTempArray = []
    const errorArray = []
    const orderObj = {
      totalAmount: 0,
      userId: body.userId
    }
    const inventoryArray = []

    const orderedProducts = body && Object.keys(body.products)

    /**This query is used to get the details of all the products which are 
     * ordered by the user, this will help in obtaining the price and check 
     * if ordered quantity is available in the inventry
     */
    const productsInDb = await Inventory.findAll({
      where: { 'product_id': orderedProducts }
    })

    
    /** Iterarting over request array to extract all the required details to place order */
    for(let product of productsInDb) {
      const tempObj = {}
      if(product.dataValues.quantityAvailable < body.products[product.productId]) {
        tempObj['errMsg'] = `${product.productName} is not available in suffecient quantity`
        errorArray.push(tempObj)
      } else {
        /** Create Order details temp tabal which contains all the details about a single product */
        tempObj['productId'] = product.productId,
        tempObj['quantity'] = body.products[product.productId]
        orderDetailsTempArray.push(tempObj)

        /** The is require to popuate total amount field in order table */
        orderObj.totalAmount += (product.price*body.products[product.productId])
        

        /** Quantity of product left after the order is successfully placed is calculated here*/
        const inventorytempObj = {}
        inventorytempObj['quantityAvailable'] = product.quantityAvailable - body.products[product.productId]      
        inventorytempObj['productId'] = product.productId
        inventoryArray.push(inventorytempObj)
      }
    }
    

    /** If length of errorArray is greater than zero that means all the products are 
     * not available the inventory so an error is thrown
     */
    if(errorArray.length > 0) return res.send({ success: false, err: errorArray })

    /** Create entry in Order table */ 
    const createdOrder = await Order.create(orderObj, {transaction: t})    


    /** Add orderId in previously created order_details array and then perform a bulk insert */
    const orderDetailsArray =  orderDetailsTempArray.map((v) => {
      v.orderId = createdOrder.dataValues.orderId
      return v
    })

    await OrderDetail.bulkCreate(orderDetailsArray, {transaction: t})



    /** Reduce the quantity of products which are ordered */
    for(let product of inventoryArray) {
      await Inventory.update(
        { 'quantityAvailable': product.quantityAvailable},
        { where: { 'productId': product.productId }},
        { transaction: t }
      )
    }

    await t.commit()
    res.send({success: true})
  } catch(err) {
    console.log('Error in creating order', err)
    await t.rollback()
    throw new Error(err)
  }
}

module.exports = {
  createOrder
}