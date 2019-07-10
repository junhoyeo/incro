const moment = require('moment');
require('moment/locale/ko');
moment.locale('ko')

const express = require('express')
const router = express.Router()

router.get('/next', function (req, res, _) {
  const format = req.query.format || 'LLLL'
  const job = require('./job');
  const nextDate = job.nextDate();
  res.send({
    next: nextDate.format(format),
    fromNow: nextDate.fromNow()
  })
})

module.exports = router
