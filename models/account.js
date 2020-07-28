const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/db.config')

const Account = db.define('account', {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true,
    field: 'user_id'
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'email'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password'
  }
}, { timestamps: false })

module.exports = Account