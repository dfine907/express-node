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

//**** ALL the routes will be authenticated from middleware
//and some of the routes (like admin, will have only accessible with admin privileges)
router.route('/').get(authenticateUser, getAllUsers)

//keep showMe first so that id is not confused in params
router.route('/showMe').get(showCurrentUser)

router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)

//this one is treated as param
router.route('/:id').get(authenticateUser, getSingleUser)

module.exports = router