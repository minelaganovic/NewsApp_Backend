const fs = require('fs');
const express = require('express');
const multer = require('multer');
const router = express.Router()
const { registerUser,
        authUser,
        getUserProfile,
        updateUserProfile
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware.js')


router.route('/').post(registerUser);
//router.route('/active/:activeToken').get(activeToken);

router.route('/login').post(authUser)
router.route('/profile').get(protect,getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

module.exports = router