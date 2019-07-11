const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');

router.get('/', function (_, res, _) {
  User.find({}, function(error, users) {
    if (error) {
      res.status(500).json({ error });
    }
    res.json({ users });
  });
});

router.post('/', function (req, res, _) {
  const { body: { id, password, name } } = req;
  console.log(id, password, name, req.body)
  if (!id || !password || !name) {
    res.sendStatus(404);
    return;
  }
  User.find({ id }, function (error, users) {
    if (error || users.length) {
      res.sendStatus(400);
    } else {
      newUser = new User({ id, password, name });
      newUser.save(function (error) {
        if (error) 
          res.status(500).json({ error });
        else
          res.sendStatus(200);
      });
    }
  });
});

router.delete('/:objectId', function (req, res, _) {
  const objectId = req.params.objectId
  User.findByIdAndRemove(objectId, function (error, user) {
    if (error) {
      res.status(500).json({ error });
      return;
    } else if (!user) {
      res.sendStatus(404);
      return;
    }
    Job.deleteMany({ user: user._id }, function (error) {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.sendStatus(200);
      }
    });
  });
});

module.exports = router;
