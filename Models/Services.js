const { default: mongoose } = require("mongoose")



const serviceSchema = new mongoose.Schema({
    image:ImageData,
    content:String
})
module.exports = mongoose.model("Services",serviceSchema,"services")
