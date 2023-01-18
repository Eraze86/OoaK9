var express = require('express');
var router = express.Router();
var path = require('path');
const cors = require("cors")
router.use(cors());
const courseModel = require("../models/course-model")
const cours = require("../courses.json") 

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log("kurser ",cours)
  let printCourse = cours.map(course => { 
  return
    Name: course
  })
  res.render("courses",{ printCourse})
console.log("syns kurserna?", printCourse)
});
router.get('/c', async function(req, res, next) {
  res.send(cours)

});

router.post('/', async function(req, res, next) {
    const course = new courseModel(req.body)
    console.log("req body", course)
  await course.save
  res.status(201).json(course)

  });

module.exports = router;