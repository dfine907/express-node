const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const { createJWT } = require('../utils')
 

const register = async (req, res) => {
  //everything is accessible in req.body because of json middleware in app.js
  const { email, name, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already in use')
  }

    //First registered user is an admin
  const isFirstAccount = await User.countDocuments({}) === 0
  const role = isFirstAccount? 'admin' : 'user'

  const user = await User.create({email, name, password, role})

  const tokenUser = { name: user.name, userId: user._id, role:user.role}
  // const token = jwt.sign(tokenUser, 'jwtSecret', {expiresIn: '1d'} )
  const token = createJWT( {payload: tokenUser})

  /*NO COOKIE- below is NOT using a cookie to store token
   res.status(StatusCodes.CREATED).json({ user:tokenUser, token })
   */

   const oneDay = 1000 * 60 *60 *24

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay)
  })
  res.status(StatusCodes.CREATED).json({ user:tokenUser })
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
