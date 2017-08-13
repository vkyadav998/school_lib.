/**
 * Created by vk on 5/21/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./schema');

var  USER = mongoose.model('USER_MODEL');

router.get('/getall_user', function(req, res)  {
    USER.find({}, function (err, docs){
        if(err){
            console.log(err);
        }
        res.json({"success" : true, allItom : docs});
    });
});

router.post('/add_user', function(req, res){
    var user =req.body;
    console.log("request = " + req.body);
    var user = new USER(user);
    user.save(function(err, data) {
        if (err) return console.error(err);
         res.json(data);
    });
});

router.post('/remove_user', function(req, res)  {
    var check =req.body;
    USER.remove({"_id":check._id}, function(err, docs){
        if(err){
            console.log(err);
        }
        res.json(docs);
    });
});


router.post('/getonemenue', function(req, res)  {
    var check=req.body;
    USER.findOne({'type':'fastfood'},function (err, docs){   // findOne in place of find  for only one record
        if(err){
            console.log(err);
        }
        res.json(docs);
    });
});

module.exports = router;
