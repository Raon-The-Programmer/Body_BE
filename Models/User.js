const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    address:String,
    passwordHash:String
})

module.exports = mongoose.model("User",userSchema,"Users")