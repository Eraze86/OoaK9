const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({

    course: String,
    price: Number,
    img: String,
    description: String,
    dates: {
        type: [mongoose.Types.ObjectId],
        ref: 'date'
    }
},
{

    versionkey: false 
})
module.exports = mongoose.model("cours", CourseSchema)