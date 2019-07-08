const CronJob = require('cron').CronJob;
const ingang = require('./ingang');
const secret = require('./secret.json');

module.exports = new CronJob({
  cronTime: '0 0 7 * * *',
  onTick: function() {
    ingang.apply(secret, 2)
  },
  start: false,
  timeZone: 'Asia/Seoul'
});
