var express = require('express');
var router = express.Router();
var path = require('path');
const cors = require("cors")
router.use(cors());
const courseModel = require("../models/course-model")
const ObjectId = require('bson-objectid');
const datesModel = require('../models/dates-model');

/////////////Handle courses/////////////
/* GET courses listing. */
router.get('/', async function(req, res, next) {
  const getCourses = await courseModel.find().populate('dates').lean().exec();
  console.log("kurser", getCourses)
    res.json(getCourses)
});

router.get('/dates', async function(req, res, next) {

  const dates = await datesModel.find().exec();
  console.log("dates", dates)
    res.json(dates)
});


router.post('/add', async function(req, res, next) {
  try{
      const newCourse = new courseModel(req.body)
      console.log("new ", newCourse)
      await newCourse.save()
      res.status(201).json("new course created")
    
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    } 
});

//uppdate course with new information
router.put('/change', async function(req, res, next) {
  try{
    const { _id, course, price, img, description } = req.body
      await courseModel.findByIdAndUpdate({_id:_id},{ $set:{course:course,price:price,img:img,description:description}})
      res.status(201).json("course is updated")
    
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
})

//försöker radera hela kedjan plus dates
router.delete('/:id', async function(req, res, next) {
  try{
    let hej = await courseModel.find({_id: req.params.id})
    console.log("hej", hej)
    res.status(201).json("Coruse deleted")

  } catch(error){
    console.log("fel", error)
    res.status(error)
    return
  }
});
  
/////////Handle dates on courses////////////

//find id, push new date in to right course
router.post('/:id', async function(req, res, next) {
  try{
    
      const find = req.params.id
      console.log("nr?",req.params.id)
      const newDate = new datesModel(req.body);
      await newDate.save()
      await courseModel.findByIdAndUpdate({_id:find}, {$push: {dates: newDate}});
      res.status(201).json("date is saved")
  
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
});
  
module.exports = router;