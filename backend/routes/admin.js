var express = require('express');
var router = express.Router();
var path = require('path');
const cors = require("cors")
router.use(cors());
const users = require("../users.json") 

/* GET home page. */
router.get('/admin', function(req, res, next) {
   res.send(users)
});

router.post('/', function(req, res, next) {
req.body.us
});

module.exports = router;
