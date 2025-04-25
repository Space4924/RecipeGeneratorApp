const mongoose=require('mongoose');
const registerSchema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNo:String,
    password:String,
    history: [
      {
        response: mongoose.Schema.Types.Mixed, // to store the full GPT response
        createdAt: { type: Date, default: Date.now },
      },
    ],
    credits:{
      type:Number,
      default:2
    }
  
})


module.exports = 
    mongoose.model("User", registerSchema);