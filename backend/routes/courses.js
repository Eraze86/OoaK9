var express = require('express');
var router = express.Router();
var path = require('path');
const cors = require("cors")
router.use(cors());
const courseModel = require("../models/course-model")
const cours = require("../courses.json") 

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const getCourses = await courseModel.find()
    res.send(getCourses)
    console.log(getCourses)
});

router.post('/add', async function(req, res, next) {
    const course = new courseModel(req.body)
    console.log("req body", course)
  await course.save
  res.status(201).json(course)

  });

module.exports = router;