const mongoose = require("mongoose")

const BookingSchema = mongoose.Schema({

    course:{
        type: String,
        required: true
    } ,
    date:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    } ,
    name:{
        type:String,
        required: true
    } ,
    breed:{
        type:String, 
    } ,
    age:{
        type:String,  
    } ,
    messenge:{
        type:String,  
    } ,
    gdpr:{
        type:Boolean,
        required: true
    }
},
{

    versionkey: false 
})
module.exports = mongoose.model("booking", BookingSchema)