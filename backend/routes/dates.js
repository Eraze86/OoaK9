var express = require('express');
var router = express.Router();
var path = require('path');
const cors = require("cors")
router.use(cors());
const datesModel = require('../models/dates-model');

router.get('/', async function(req, res, next) {
    const dates = await datesModel.find().exec();
    console.log("dates", dates)
      res.json(dates)
  });

//find date and change avalible spots
  router.put('/edit', async function(req, res, next) {
    try{

      let hej = await datesModel.findOneAndUpdate({_id: req.body.dateid}, {$inc:{number: -1}})
   console.log("hej", hej)
    //   for(var i=0;i<hu.length;i++){
    //     console.log(hu[i]._id)
    // };

      } catch(error){
        console.log("fel", error)
        res.status(error)
        return
      }
  })

  //find date and delete
  router.delete('/:id', async function(req, res, next) {
    try{
      await datesModel.findByIdAndRemove({_id: req.params.id})
      let data =  await datesModel.find()
      res.status(201).json(data)
 
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
  });

  module.exports = router;