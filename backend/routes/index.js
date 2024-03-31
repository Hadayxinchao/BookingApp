const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/place', require('./place'));

module.exports = router;
