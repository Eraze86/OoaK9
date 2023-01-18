const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
    name: String,
    price: Number,
    img: String,
    description: String,
    date: [String]
})
module.exports = mongoose.model("cours", CourseSchema)