const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/db.config')

const Inventory  = db.define('inventory', {
  productId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    field: 'product_id'
  },
  productName: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'product_name'
  },
  quantityAvailable: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    field: 'quantity_available'
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'price'
  },
}, {timestamps: false, freezeTableName: true })

module.exports = Inventory