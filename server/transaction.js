/**
 * Created by vk on 5/21/2017.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./schema');

var  TRANSACTION = mongoose.model('TRANSACTION_MODEL');
var  BOOK = mongoose.model('BOOK_MODEL');

router.get('/getall_transaction', function(req, res)  {
    TRANSACTION.find({}, function (err, docs){
        if(err){
            console.log(err);
        }
        res.json({"success" : true, allItom : docs});
    });
});

router.post('/issueBook', function(req, res){
    let reqData =req.body;
    let transction = new TRANSACTION(reqData);

    let mpromise = transction.save();
    mpromise.then(function (data) {
        BOOK.findOneAndUpdate({"_id":reqData.bookID}, {$set:{availability:false}},function(err, docs){
            res.json(docs);
        });
    }).catch(function (err) {
        console.error(err);
    });
});

router.post('/returnBook', function(req, res){
    let reqData =req.body;
    BOOK.findOneAndUpdate({"_id":reqData.bookID}, {$set:{availability:true}},function(err, docs){
        res.json(docs);
    });
});

module.exports = router;
