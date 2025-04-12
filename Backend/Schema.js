const mongoose=require('mongoose');
const registerSchema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNo:String,
    password:String
})


module.exports = 
    mongoose.model("User", registerSchema);