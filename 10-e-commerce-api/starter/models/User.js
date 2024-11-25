const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minLenth: 3,
    maxLenght: 50,
  },

  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
       validator: validator.isEmail,
        message: 'Please provide valid email'
    }
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLenth: 6,
  },
  roles: {
    emun: ['admin', 'user'], 
    default: 'user'
  }
})

module.exports = mongoose.model('User', UserSchema)
