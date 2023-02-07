var express = require('express');
var router = express.Router();
const cors = require("cors");
const bookingsModel = require('../models/bookings-model');

router.use(cors());

router.get('/', async function(req, res, next) {
    const getBookings = await bookingsModel.find()
    res.send(getBookings)
    console.log(getBookings)
   
});
//ska ny bokning, se till att det finns error om det inte finns någon bokning  och vad som händer då
router.post('/add', async function(req, res, next) {
    try{
        const newBooking = new bookingsModel(req.body)
        console.log("new ", newBooking)
        await newBooking.save()
        res.status(201).json("new booking created")
      
      } catch(error){
        console.log("fel", error)
        res.status(error)
        return
      }
      

});
//har vi rätt adress när vi ska ändra och radera? kolla!
router.put('/change', async function(req, res, next) {

    try{
      const { _id, course, date, phone, mail } = req.body
      console.log("bakend id", _id)
        let booking = await bookingsModel.findByIdAndUpdate({_id:_id},{ $set:{course:course,data:date,phone:phone,mail:mail}})
        res.status(201).json(booking)
      
      } catch(error){
        console.log("fel", error)
        res.status(error)
        return
      }
  })
    

  
router.delete('/:id', async function(req, res, next) {
  try{
    await bookingsModel.findByIdAndRemove({_id: req.params.id})
    console.log("id", req.params.id)
    res.status(201).json("Booking deleted")

  } catch(error){
    console.log("fel", error)
    res.status(error)
    return
  }
});

module.exports = router;
