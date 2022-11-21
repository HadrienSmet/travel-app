const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const password = require('../middleware/password');
const userCtrl = require('../controllers/user');

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.patch('/userProfile/:id', auth, multer, userCtrl.uploadUserPictures);
router.put('/setAlbum/:userId', auth, multer, userCtrl.uploadAlbum);
router.put('/setTrip/:userId', auth, userCtrl.addNewTrip);

module.exports = router;