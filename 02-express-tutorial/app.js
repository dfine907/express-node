const express = require('express')
const app = express()
const logger = require('./logger')
//request => middleware => response

app.use(logger)
//  MOVED to it's own file ---- >
// const logger = (req,res, next) => {
//   const method = req.method
//   const url = req.url
//   const time = new Date().getFullYear()
//   console.log(method, url, time)
//   // res.send('Testing ')
//   next()
// }

app.get('/', (req, res) => {
  res.send('<h2>HOME PAGE</h2>')
})

app.get('/about', (req, res) => {
  res.send('About Page')
})
app.get('/api/products', (req, res) => {
  res.send('Products Page')
})
app.get('/api/items', (req, res) => {
  res.send('Items Page')
})
app.get('/api/customers', (req, res) => {
  res.send('Customers Page')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
