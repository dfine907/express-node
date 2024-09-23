const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
require('dotenv').config()

//Middleware

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)
app.use(notFound)


// app.use( (req, res, next) => {
  //   res.status(404).send("Sorry, that route does not exist")
  // })
  

const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server listening on port ${port} ...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
