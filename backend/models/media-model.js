const mongoose = require("mongoose")

const mediaSchema = mongoose.Schema({
    name: string,
    img: string,
})
module.exports = mongoose.model("media", mediaSchema)