const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  }
});
module.exports = mongoose.model("user", UserSchema);
