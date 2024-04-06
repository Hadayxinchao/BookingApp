const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/places', require('./place'));
router.use('/booking', require('./booking'));

module.exports = router;
