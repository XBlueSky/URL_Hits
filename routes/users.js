var express = require('express');
//var app = express();
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection failed: '));
db.once('open', function(){
    console.log('mongoose opened!');
});

router.get('/',function(req,res){
    var webSchema = new mongoose.Schema({
        url:   String,
        clicktimes:  String
    },
    {collection: 'day'}
    );

    mongoose.model('day', webSchema)
    .find({}, {_id: 0, url: 1, clicktimes: 1})
    .sort({clicktimes: 'desc'})
    .limit(100)
    .exec(function(err, docs){
        if(err) console.log(err);
        else{
            /*var arr = [];
            docs.forEach(doc => {
                doc.toObject(); 
                arr.push({url: doc.url, clicktimes:  doc.clicktimes});
            });*/
            res.json(docs);
            //console.log(arr.length);
            }
    });
});

module.exports = router;
