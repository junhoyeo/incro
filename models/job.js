const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JobSchema = new Schema({
  user: String,
  timestamp: Number,
});

module.exports =  mongoose.model('Job', JobSchema)
