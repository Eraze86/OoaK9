const mongoose = require("mongoose")

const ContentSchema = mongoose.Schema({

    name:{
        type: String,   
    } ,
    text:{
        type: String,
    },
    img:{
        type: String,
    }
},
{
    versionkey: false 
})
module.exports = mongoose.model("content", ContentSchema)