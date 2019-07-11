const express = require('express');
const app = express();
const cron = require('./cron');
const router = require('./routes');
const secret = require('./secret.json');

cron.start();

app.use(express.json());
app.use('/api', router);

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(secret.mongo, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function (callback) {
  console.log('Connection Succeeded')
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`app listening on port: ${port}`);
  console.log(cron.nextDate().toString());
});
