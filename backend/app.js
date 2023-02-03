var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
const MongoClient = require ("mongodb").MongoClient

var adminRouter = require('./routes/admin');
var mediaRouter = require('./routes/media');
var bookingsRouter = require('./routes/bookings');
var coursesRouter = require('./routes/courses');
var app = express();

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// connect mongodb server
MongoClient.connect("mongodb+srv://eraze86:vTAm4ylx245Gk1kM@ooak9.utw3gt2.mongodb.net/ooak9",  {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
.then(client => {console.log("Vi är uppkopplade")
const db = client.db("ooak9databas")
app.locals.db = db;
})

async function init(){
    try {
        await mongoose.connect("mongodb+srv://eraze86:vTAm4ylx245Gk1kM@ooak9.utw3gt2.mongodb.net/ooak9") 
        // .then(mongoose.set('strictQuery', false))
        console.log("databas is connected") 
         
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
app.use(cookieParser("ukohfkh"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);
app.use('/bookings', bookingsRouter);
app.use('/media', mediaRouter);
app.use('/courses', coursesRouter);


module.exports = app;
