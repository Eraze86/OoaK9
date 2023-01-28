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
        res.json("sparad")
        res.status(201).json("newBooking")
      
      } catch(error){
        console.log("fel", error)
        res.status(error)
        return
      }
      

});

router.put('/change', async function(req, res, next) {
     const { _id, course, date, phone, mail } = req.body
console.log("bakend id", _id)
    const book = await bookingsModel.model.findById({_id})
    console.log("book", book._id, "req", req.body._id)
    book.course = course
    book.date = date
    book.phone = phone
    book.mail = mail

    await book.save()
res.status(200).json(book)

  })
    

router.delete('/:id', async function(req, res, next) {
    console.log("vad har vi här", req.params.id)
await bookingsModel.findByIdAndRemove({_id: req.params.id})
if (err){
    console.log("error delete", err)
}
else{
    console.log("Removed User : ", req.params.id);
}
});

module.exports = router;
