const mongoose = require('mongoose')

mongoose.set('strictQuery', false) // Or false, based on your preference

const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB
