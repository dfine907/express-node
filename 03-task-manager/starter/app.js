const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

//middlewares
app.use(express.static('./public'))
app.use(express.json())

//Routes:

app.use('/api/v1/tasks', tasks)

/* Pseudo Code - what routes I need
app.get('/api/v1/tasks')   - gets ALL tasks
app.post('/api/v1/tasks')   - creates a new task
app.get('/api/v1/tasks/:id') - get one task
app.patch('/api/v1/tasks/:id') - upate one task
app.delete('/api/v1/tasks/:id') - delte one task

*/

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
