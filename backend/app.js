var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var mediaRouter = require('./routes/media');
var bookingsRouter = require('./routes/bookings');
var app = express();

const mongoose = require("mongoose")
// const MongoClient = require ("mongodb").MongoClient

//connect mongodb server
// MongoClient.connect("mongodb://127.0.0.1:27017",  {
//     useUnifiedTopology: true
// })
// .then(client => {console.log("Vi är uppkopplade")
// const db = client.db("ooak9databas")
// app.locals.db = db;
// })

 function init() {
    try {
        const options = mongoose.set('strictQuery', false)
        mongoose.connect("mongodb://127.0.0.1:27017", options, () => console.log("databas is connected")) 
        
    } catch (error) {
        console.log("database error", error)
    }
    
}
init()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/bookings', bookingsRouter);
app.use('/media', mediaRouter);

module.exports = app;
