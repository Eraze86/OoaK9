var express = require('express');
var router = express.Router();
var path = require('path');
const cors = require("cors")
router.use(cors());
const courseModel = require("../models/course-model")

/* GET courses listing. */
router.get('/', async function(req, res, next) {
  const getCourses = await courseModel.find()
    res.send(getCourses)
    console.log(getCourses)
});

router.post('/add', async function(req, res, next) {
  console.log(req.body)
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
//har vi rätt adress när vi ska ändra och radera? kolla!
// router.put('/change', async function(req, res, next) {

//   try{
//     const { _id, course, date, phone, mail } = req.body
//     console.log("bakend id", _id)
//       let booking = await bookingsModel.findByIdAndUpdate({_id:_id},{ $set:{course:course,data:date,phone:phone,mail:mail}})
//       res.status(201).json(booking)
    
//     } catch(error){
//       console.log("fel", error)
//       res.status(error)
//       return
//     }
// })
  

//find id, push new date in to right course
router.post('/:id', async function(req, res, next) {
  try{
 
    const find = req.params.id
    await courseModel.findByIdAndUpdate({_id:find},{ $push:{dates: req.body}})
      res.status(201).json("date is saved")
  
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
});

//find course id, delete date
  router.delete('/delete/date', async function(req, res, next) {
    try{
      let id = req.body.id
      let date = req.body.date
      // { $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }
      await courseModel.findByIdAndRemove(req.params.id, {$pull: {dates: date}} )
      console.log("course rätt?" ,id)
      console.log("datum rätt?" , date)    
        res.status(201).json("Booking deleted")
 
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
  });

  router.delete('/delete/', async function(req, res, next) {
    try{
    let {id} = req.body
      // { $pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }
      await courseModel.findByIdAndRemove({id})
 
        res.status(201).json("Coruse deleted")
 
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
  });

module.exports = router;