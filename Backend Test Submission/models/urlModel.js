const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  timestamp: Date,
  ip: String,
  referer: String,
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortcode: String,
  createdAt: Date,
  expiry: Date,
  clicks: [clickSchema],
});

module.exports = mongoose.model('Url', urlSchema);
