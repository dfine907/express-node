const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

//middleware that authenticates for each user
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token
  if (!token) {
    throw new CustomError.UnauthenticatedError(
      'Authentication invalid'
    )
  }

  try {
    const { name, userId, role } = isTokenValid({ token })
    req.user = { name, userId, role }
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError(
      'Authentication invalid'
    )
  }
}

//middleware checks for authorizing (I kept it together in the same file)
const authorizePermissions = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new CustomError.UnauthorizedError(
      'Unauthorized to access route'
    )
  }

  // try {
  //   const { name, userId, role } = isTokenValid({ token })
  //   req.user = { name, userId, role }
  //   next() //pass to the next route
  // } catch (error) {
  //   throw new CustomError.UnauthorizedError(
  //     'Forbidden to access this route'
  //   )
  // }
}

module.exports = {
  authenticateUser,
  authorizePermissions,
}
