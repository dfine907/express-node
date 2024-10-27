const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
/* BELOW IS THE CODE TO HASH BEFORE USING MONGOOSE - START...
  const { name, email, password } = req.body
  if(!name || !email || !password){
    throw new BadRequestError("Please provide name, email and password")
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const tempUser = { name, email, password: hashedPassword }
  END
  */

 /* Below is the REFACTORED CODE using the User schema:*/
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send('Login User!')
}

module.exports = {
  register,
  login,
}
