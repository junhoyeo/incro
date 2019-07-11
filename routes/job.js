const express = require('express');
const router = express.Router();
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
  } else if (![1, 2, 3].includes(ingangTime)) {
    res.sendStatus(409);
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
          res.status(200).json({ objectId: newJob._id });
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
    res.sendStatus(200);
  });
});

module.exports = router;
