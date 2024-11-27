const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
//utils here

const register = async (req, res) => {
  //everything is accessible in req.body because of json middleware in app.js
  const {email} = req.body

  const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError("Email already in use")
    }

  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send('Login user')
}

const logout = async (req, res) => {
  res.send('Logout user')
}

module.exports = {
  register,
  login,
  logout,
}
