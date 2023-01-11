var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("home")
  // res.sendFile(path [, options] [, fn])
  console.log(__dirname)
});

module.exports = router;
