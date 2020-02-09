const mongoose = require('mongoose');

const blog = new mongoose.Schema({
  title: String,
  content: String,
  description: String,
  author: String,
  status: Boolean,
  date: Date
});

module.exports = mongoose.model('Blog', blog);
