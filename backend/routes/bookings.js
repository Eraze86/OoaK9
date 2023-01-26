var express = require('express');
var router = express.Router();
var path = require('path');
var rand = require("random-key")
 

const bookings = require("../bookings.json") 
let fs = require("fs");
const { send } = require('process');
/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile("bookings.json", function(err, data){
        if(err){
            console.log("error", err)
        }
        // let book = JSON.parse.data
        res.send(data)
    
        return
    })
});
//ska ny bokning, se till att det finns error om det inte finns någon bokning  och vad som händer då
router.post('/add', function(req, res, next) {
    let list = { ...req.body };
   
    fs.readFile("bookings.json", function(err, data){
        if(err){
            console.log("error", err)
            // if("bookings.json" === null){
            // }
        }
        let bookings = JSON.parse(data)
        let newBooking = {
            "id": rand.generate(), 
            "course": req.body.course, 
            "price": req.body.price, 
            "date": req.body.date, 
            "name": req.body.name, 
            "phone": req.body.phone, 
            "mail": req.body.mail, 
            "breed": req.body.breed, 
            "age": req.body.age, 
            "messenge": req.body.messenge,
            "gdpr": req.body.gdpr
        }
        bookings.push(newBooking)
       fs.writeFile("bookings.js", JSON.stringify(bookings, null), function(err){
        if(err){
            console.log("error", err)
        }
        console.log(bookings)
    res.send("datan har kommit in")
       })
        return
    })
});

router.put('/change', function(req, res, next) {
    fs.readFile("bookings.json", function(err, data){
        if(err){
            console.log("error", err)
        }
        req.body
        (console.log("req", req.body))
        // let book = JSON.parse.data
    //    fs.writeFile("bookings.js")
        return
    })

});

router.delete('/delete', function(req, res, next) {
    fs.readFile("bookings.json", function(err, data){
        if(err){
            console.log("error", err)
        }
        let changeInfo = data
        data.push(changeInfo)
        return
    })
});

module.exports = router;
