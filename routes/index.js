const express = require('express');
const router = express.Router();

router.use('/cron', require('./cron'));
router.use('/user', require('./user'));
router.use('/job', require('./job'));

module.exports = router;
