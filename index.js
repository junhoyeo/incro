const express = require('express');
const app = express();
const job = require('./job');

job.start();

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`app listening on port: ${port}`);
  console.log(job.nextDate().toString())
});
