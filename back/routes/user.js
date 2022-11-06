const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const password = require('../middleware/password');
const userCtrl = require('../controllers/user');

router.post('/signup', password, multer, userCtrl.signup);
router.post('/login', userCtrl.login);
// router.patch('/profilePicture/:id', auth, multer, userCtrl.uploadProfilePicture);

module.exports = router;