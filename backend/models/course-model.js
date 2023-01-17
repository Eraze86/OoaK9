const mongoose = require("mongoose")

const coursSchema = mongoose.Schema({
    id: number,
    name: string,
    price: number,
    img: string,
    description: string,
    date: []
})
module.exports = mongoose.model("cours", coursSchema)