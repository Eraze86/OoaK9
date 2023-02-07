const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
    course: String,
    price: Number,
    img: String,
    description: String,
    dates: [{
        date: String,
        number: Number,
    }]
})
module.exports = mongoose.model("cours", CourseSchema)