const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const { attachCookiesToResponse } = require('../utils')

const register = async (req, res) => {
  //everything is accessible in req.body because of json middleware in app.js
  const { email, name, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already in use')
  }

  //First registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ email, name, password, role })
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  }
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}
// *****************  LOGIN IN *************************
const login = async (req, res) => {

  // firsrt destructure req.body has it all:
  const {email, password} = req.body
  if(!email || !password){
    throw new CustomError.BadRequestError('Please provide email and password')
  }
  //check if there is a user in DB
  const user = await User.findOne({ email })
  if(!user){
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }
  //check the right password
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  }
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })

  // res.send('Login user')
}

// *****************  LOGIN OUT ************************

const logout = async (req, res) => {
  res.send('Logout user')
}

module.exports = {
  register,
  login,
  logout,
}
