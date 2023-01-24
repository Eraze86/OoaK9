var express = require('express');
var router = express.Router();
var path = require('path');
const bookings = require("../bookings.json") 

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(bookings)
});

module.exports = router;
