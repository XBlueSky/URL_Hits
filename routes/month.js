var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var web = new Schema({
  url : String,
  clicktimes : Number});
module.exports = mongoose.model('day',web,'day');
