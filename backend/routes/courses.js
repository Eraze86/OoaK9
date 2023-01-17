var express = require('express');
var router = express.Router();
var path = require('path');
const courseModel = require("../models/course-model")

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.sendFile(path.join(__dirname, "../public/courses.html"));
  
});

router.post('/', async function(req, res, next) {
    const course = new courseModel(req.body)
  await course.save
  res.status(201).json(course)

  });

module.exports = router;