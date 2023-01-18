var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mediaRouter = require('./routes/media');
var bookingsRouter = require('./routes/bookings');
var coursesRouter = require('./routes/courses');
var app = express();

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
const mongoose = require("mongoose")
// const MongoClient = require ("mongodb").MongoClient

// // connect mongodb server
// MongoClient.connect("mongodb://127.0.0.1:27017",  {
//     useUnifiedTopology: true
// })
// .then(client => {console.log("Vi är uppkopplade")
// const db = client.db("ooak9databas")
// app.locals.db = db;
// })

function init(){
    try {
        const options = mongoose.set('strictQuery', false)
  
 mongoose.connect("mongodb+srv://eraze86:vTAm4ylx245Gk1kM@ooak9.utw3gt2.mongodb.net/ooak9", 
 options, () => console.log("databas is connected")) 
         
    } catch (error) {
        console.log("database error", error)
    }
    
}
init()
// Lösenord: vTAm4ylx245Gk1kM


console.log("funkar databasen?",mongoose.connection.readyState)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/bookings', bookingsRouter);
app.use('/media', mediaRouter);
app.use('/courses', coursesRouter);


module.exports = app;
