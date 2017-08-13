/**
 * Created by vk on 5/21/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./schema');

var  BOOK = mongoose.model('BOOK_MODEL');

router.get('/getall_book', function(req, res)  {
    BOOK.find({}, function (err, docs){
        if(err){
            console.log(err);
        }
        res.json({"success" : true, allItom : docs});
    });
});

router.post('/add_book', function(req, res){
    var book =req.body;
    console.log("request = " + req.body);
    var book = new BOOK(book);
    book.save(function(err, data) {
        if (err) return console.error(err);
         res.json(book);
    });
});

router.post('/remove_book', function(req, res)  {
    var check =req.body;
    BOOK.remove({"_id":check._id}, function(err, docs){
        if(err){
            console.log(err);
        }
            res.json(docs);
    });
});

router.post('/update_book', function(req, res)  {
    var check =req.body;
    BOOK.findOneAndUpdate({"_id":check.bookID}, {$set:{availability:check.availability}},function(err, docs){
        if(err){
            console.log("Something wrong when updating data!");
        }
            res.json(docs);
    });
});


router.post('/getonemenue', function(req, res)  {
    var check=req.body;
    BOOK.findOne({'type':'fastfood'},function (err, docs){   // findOne in place of find  for only one record
        if(err){
            console.log(err);
        }
        res.json(docs);
    });
});

module.exports = router;
