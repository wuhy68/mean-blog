const mongoose = require('mongoose');

const comment = new mongoose.Schema({
  blog: String,
  comment: String,
  from: String,
  to: String,
  reply: String,
  status: Boolean,
  date: Date
});

module.exports =  mongoose.model('Comment', comment);
