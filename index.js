const express = require('express');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const db = require('./config/db.config')
const router = require('./routes')

const app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// mount route on app
app.use('/v1', router)

const port = process.env.PORT

// connect database
db.authenticate()
.then(() => {
  console.log('authenticated')

  // This is kept inside so that app start if db connection is successfull
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  
})
.catch((err) => {
  console.log('error', err)
})

process.on('uncaughtException', () => {
  process.exit(1)
})