const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');

router.get('/', function (_, res, _) {
  Job.find({}, function(error, jobs) {
    if (error) {
      res.status(500).json({ error });
    }
    res.json({ jobs });
  });
});

router.post('/', function (req, res, _) {
  const { body: { user, ingangTime, ingangDate } } = req;
  if (!user || !ingangTime || !ingangDate) {
    res.sendStatus(404);
    return;
  }
  Job.find({ user, ingangTime, ingangDate }, function (error, jobs) {
    if (error || jobs.length) {
      res.sendStatus(400);
    } else {
      newJob = new Job({ user, ingangTime, ingangDate });
      newJob.save(function (error) {
        if (error) 
          res.status(500).json({ error });
        else
          res.sendStatus(200);
      });
    }
  });
})

router.delete('/:objectId', function (req, res, _) {
  const objectId = req.params.objectId
  Job.findByIdAndRemove(objectId, function (error, job) {
    if (error) {
      res.status(500).json({ error });
      return;
    } else if (!job) {
      res.sendStatus(404);
      return;
    }
  });
});

module.exports = router;
