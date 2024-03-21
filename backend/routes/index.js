const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.use('/user', require('./user'));

module.exports = router;
