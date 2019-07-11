const CronJob = require('cron').CronJob;
const ingang = require('./utils/ingang');
// const secrets = require('./secrets.json');

module.exports = new CronJob({
  cronTime: '0 0 7 * * *',
  onTick: function() {
    // secrets.forEach((secret) => {
    //   ingang.apply(secret, 2);
    // });
  },
  start: false,
  timeZone: 'Asia/Seoul'
});
