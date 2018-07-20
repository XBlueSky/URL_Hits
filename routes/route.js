var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var route = new Schema({
  url : String,
  ref : [],
  des : [],
  month : String
});
module.exports = mongoose.model('route',route,'route');
