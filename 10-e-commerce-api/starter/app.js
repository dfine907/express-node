require('dotenv').config()
require('express-async-errors') // applied to ALL controller automatically

const express = require('express')
const app = express()

//database
const connectDB = require('./db/connect')
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.get('/', (req, res) => {
  console.log(req.body)
  res.send('E-commerce API')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`Listening on port ${port}... `))
  } catch (error) {
    console.log(error)
  }
}

start()
