var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var mediaRouter = require('./routes/media');
var bookingsRouter = require('./routes/bookings');
var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/bookings', bookingsRouter);
app.use('/media', mediaRouter);


const MongoClient = require ("mongodb").MongoClient
MongoClient.connect("mongodb://127.0.0.1:27017",  {
    useUnifiedTopology: true
})
.then(client => {console.log("funkar")
const db = client.db("newLetter")
app.locals.db = db;
})

module.exports = app;
