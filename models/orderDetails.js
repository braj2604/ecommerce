const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/db.config')

const OrderDetail = db.define('order_details', {
  orderDetailId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    field: 'order_detail_id'
  },
  orderId: {
    type: DataTypes.UUID,
    references: {
      model: 'orders',
      key: 'order_id'
    },
    field: 'order_id',
    allowNull: false
  },
  productId: {
    type: DataTypes.UUID,
    references: {
      model: 'inventory',
      key: 'product_id'
    },
    field: 'product_id',
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'quantity'
  }
}, { timestamps: false, freezeTableName: true })

module.exports = OrderDetail