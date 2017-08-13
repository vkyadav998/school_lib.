var express = require('express');
var router = express.Router();

var book = require('./book');
var user = require('./user');
var admin = require('./admin');
var transaction = require('./transaction');

router.use("/book", book);
router.use("/user", user);
router.use("/admin", admin);
router.use("/transaction", transaction);

module.exports = router;
