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
    let transaction =req.body;
    let transct = new TRANSACTION(transaction);

    let mpromise = transct.save().exec();
    mpromise.then(function (data) {
        res.json(data);
    }).catch(function (err) {
        console.error(err);
    });
});

router.post('/add_transaction', function(req, res){
    let transaction =req.body;
    let transct = new TRANSACTION(transaction);

    transct.save(function(err, data) {
        if (err) return console.error(err);
        res.json(data);
    });
});

module.exports = router;
