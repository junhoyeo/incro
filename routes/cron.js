const express = require('express');
const router = express.Router();

const moment = require('moment');
require('moment/locale/ko');
moment.locale('ko');

const cron = require('../cron');

router.get('/', function (req, res, _) {
  const format = req.query.format || 'LLLL';
  const nextDate = cron.nextDate();
  res.send({
    next: nextDate.format(format),
    fromNow: nextDate.fromNow()
  });
});

module.exports = router;
