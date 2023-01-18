var express = require('express');
var router = express.Router();
var path = require('path');
var pug = require('pug');



/* GET admin site */
router.get('/', function(req, res, next) {
  res.render("admin")

});

module.exports = router;
