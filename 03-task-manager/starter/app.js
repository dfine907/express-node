const express = require('express')
const app = express()
const port = 3000

//Routes:
app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

/* Pseudo Code - what routes I need
app.get('/api/v1/tasks')   - gets ALL tasks
app.post('/api/v1/tasks')   - creates a new task
app.get('/api/v1/tasks/:id') - get one task
app.patch('/api/v1/tasks/:id') - upate one task
app.delete('/api/v1/tasks/:id') - delte one task

*/


app.listen(port, () => {
  console.log(`Server listening on port ${port} ...`)
})