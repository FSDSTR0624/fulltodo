const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');

router.get('/', usercontroller.getUserInfo);
router.post('/login', usercontroller.loginUser);


module.exports = router;