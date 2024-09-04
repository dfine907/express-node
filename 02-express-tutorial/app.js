const express = require('express')
const app = express()

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.post()
// app.put()
// app.delete()
// app.all()
// app.use()

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})