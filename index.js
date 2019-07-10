const express = require('express');
const app = express();
const job = require('./job');
const router = require('./routes');

job.start();

app.use('/api', router);

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`app listening on port: ${port}`);
  console.log(job.nextDate().toString())
});
