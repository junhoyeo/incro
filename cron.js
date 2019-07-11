const CronJob = require('cron').CronJob;
const ingang = require('./utils/ingang');
const User = require('./models/user');
const Job = require('./models/job');
const moment = require('moment');

module.exports = new CronJob({
  cronTime: '0 0 7 * * *',
  onTick: function() {
    Job.find({ ingangDate: moment().format('YYYYMMDD') }, function(error, jobs) {
      if (error) {
        console.error(error);
        return;
      }
      console.log(jobs)
      jobs.forEach((job) => {
        User.findById(job.user, function (error, user) {
          if (error) {
            console.log(error);
            return;
          }
          ingang.apply(user, job.ingangTime)
            .then((res) => {
              console.log(`[*] result: ${res}`);
              if (res === 200) {
                // delete job
              }
            })
        });
      });
    });
  },
  start: false,
  timeZone: 'Asia/Seoul'
});
