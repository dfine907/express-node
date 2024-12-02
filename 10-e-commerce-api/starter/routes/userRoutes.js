const express = require('express')
const router = express.Router()

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/userController')

//**** ALL the routes will be authenticated from middleware
//and some of the routes (like admin, will have only accessible with admin privileges)
router.route('/').get(getAllUsers)

router.route('/showMe').get(showCurrentUser)
router.route('/updateUser').post(updateUser)
router.route('/updateUserPassword').post(updateUserPassword)

router.route('/:id').get(getSingleUser)

module.exports = router