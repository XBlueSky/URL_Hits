var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poly = new Schema({
  url : String,
  clicktimes : [],
  month : String
});
module.exports = mongoose.model('poly',poly,'poly');
