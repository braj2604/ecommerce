const { Sequelize } = require('sequelize')

const dbName = process.env.DB_NAME
const userName = process.env.DB_USER
const password = process.env.DB_PASSWORD

const options = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,

  pool: {
    max: parseInt(process.env.POOL_MAX),
    min: parseInt(process.env.POOL_MIN),
    acquire: parseInt(process.env.POOL_ACQUIRE),
    idle: parseInt(process.env.POOL_IDLE)
  }
}

const db = new Sequelize(dbName, userName, password, options)

module.exports = db