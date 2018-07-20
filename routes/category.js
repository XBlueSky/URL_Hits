var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category = new Schema({
  category : [],
  month : String
});
module.exports = mongoose.model('category',category,'categorylist');
