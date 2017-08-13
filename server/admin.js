/**
 * Created by vk on 5/21/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./schema');

var  ADMIN = mongoose.model('ADMIN_MODEL');

router.get('/getall_admin', function(req, res)  {
    ADMIN.find({}, function (err, docs){
        if(err){
            console.log(err);
        }
        res.json({"success" : true, allItom : docs});
    });
});

router.post('/add_admin', function(req, res){
    var admin =req.body;
    console.log("request = " + req.body);
    var admin = new ADMIN(admin);
    admin.save(function(err, data) {
        if (err) return console.error(err);
         res.json(admin);
    });
});

router.post('/remove_admin', function(req, res)  {
    var admin = new ADMIN(admin);
    admin.remove({"_id": "59209064277eb62a002d5f8c"}, function(err, docs){ // not working i think
        if(err){
            console.log(err);
        }
        res.json(docs);
    });
});

router.post('/getonemenue', function(req, res)  {
    var check=req.body;
    ADMIN.findOne({'type':'fastfood'},function (err, docs){   // findOne in place of find  for only one record
        if(err){
            console.log(err);
        }
        res.json(docs);
    });
});

module.exports = router;
