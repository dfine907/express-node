require('dotenv').config()
require('express-async-errors') // applied to ALL controller automatically

const express = require('express')
const app = express()

//rest of the packages
const morgan = require('morgan')

//database
const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/authRoutes')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
  console.log(req.body)
  res.send('E-commerce API')
})

app.use('/api/v1/auth', authRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`Listening on port ${port}... `))
  } catch (error) {
    console.log(error)
  }
}

start()
