const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    passwordHash:String,
    Phone:Number
})

module.exports = mongoose.model("User",userSchema,"Users")