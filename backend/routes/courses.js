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
//skickar id, hittar id. Skickar date och number. Lägg till
router.post('/:id', async function(req, res, next) {
  try{
    const {array} =req.body
    console.log("array", req.body)
    console.log("hitta post", req.params.id)
      const findCourse= courseModel.findById(req.params.id)
      if(findCourse){
        const newDate = new courseModel({date: findCourse.dates.date, number: findCourse.dates.number})
      }
   
      console.log("new ", newDate)
      // await newBooking.save()
      // res.status(201).json("new booking created")
    
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
    

});

  router.delete('/delete', async function(req, res, next) {
    try{
      let id = req.body.id
      let date = req.body.date

     let course =  await courseModel.findById(id)
     for (let i = 0; i < course.dates.length; i++) {
      // console.log("course rätt?" , course.dates[i]._id)
      // console.log("datum rätt?" , date)
      if(course.dates[i]._id === date){
   
        console.log("rätt datum")
      }else{
        console.log("fel datum")
      }      
     }
   
    //  let joho =  await courseModel.findOneAndRemove({course.dates.date})
        res.status(201).json("Booking deleted")
 
   
      // console.log("hitta annat", req.params)
  
    
  
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
  });


module.exports = router;