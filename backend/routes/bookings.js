var express = require('express');
var router = express.Router();
var path = require('path');
const bookings = require("../bookings.json") 
let fs = require("fs")
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
router.post('/change', function(req, res, next) {
    fs.readFile("bookings.json", function(err, data){
        if(err){
            console.log("error", err)
        }
        // let book = JSON.parse.data
        res.send(data)
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
