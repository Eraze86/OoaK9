const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    user: string,
    password: string,
    
})
module.exports = mongoose.model("user", userSchema)