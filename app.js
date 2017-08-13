/**
 * Created by vk on 5/21/2017.
 */

var express = require("express");
var app = new express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-autoincrement');

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

mongoose.connect('mongodb://localhost/school');

var router = express.Router();

app.use(express.static('public/'));
var reqserver = require('./server/manager');

app.use('/', reqserver);

app.get('/', function(req, res) {
    res.json({ message: 'Application is running here. hit on [ /api ] to connect database.' });
});

app.listen("3001",function(){
    console.log("!! server started on port 3000 !!");
});
