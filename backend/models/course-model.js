const mongoose = require("mongoose")

const courseSchema = mongoose.Schema({
    name: String,
    price: Number,
    img: String,
    description: String,
    date: []
})
module.exports = mongoose.model("cours", courseSchema)