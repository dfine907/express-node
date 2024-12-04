const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middleware/authentication')

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController')

//**** All the routes will be authenticated from middleware
//later some of the routes (like admin, will have only accessible with admin privileges)
router.route('/').get(authenticateUser, getAllUsers)

router.route('/showMe').get(showCurrentUser)

router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)

router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router