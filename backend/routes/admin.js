var express = require('express');
var router = express.Router();
var path = require('path');
const cors = require("cors")
router.use(cors());
const content = require("../content.json") 

/* GET home page. */
router.get('/content', function(req, res, next) {
 res.send(content)
//  console.log("vad skickas ",content)
});

router.post('/conent/id', function(req, res, next) {

});

module.exports = router;
