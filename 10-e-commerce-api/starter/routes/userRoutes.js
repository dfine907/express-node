const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController')

//**** All the routes will be authenticated from middleware
//FIRST we need to check authenticated, THEN we checked for roles/permissions
router.route('/').get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers)

router.route('/showMe').get(authenticateUser, showCurrentUser)

router.route('/updateUser').patch(authenticateUser, updateUser)

router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)

router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router