const mongoose = require("mongoose")

const DatesSchema = new mongoose.Schema({

        date:{
            type: String
        } ,
        number: {
            type: Number}
 
},
{

    versionkey: false 
})
module.exports = mongoose.model("date", DatesSchema)

