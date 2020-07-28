const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/db.config')

const Order = db.define('order', {
  orderId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    field: 'order_id'
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'accounts',
      key: 'user_id'
    },
    field: 'user_id',
    allowNull: false
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    field: 'order_date'
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'total_amount'
  }
}, { timestamps: false })

module.exports = Order