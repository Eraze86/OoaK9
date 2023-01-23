const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
    name: String,
    price: Number,
    img: String,
    description: String,
    dates: [{
        date: Date,
        number: Number,
    }]
})
module.exports = mongoose.model("cours", CourseSchema)