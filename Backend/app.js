const express=require('express')
const app=express();
const mongoose=require('mongoose')
app.use(express.json());
const OpenAI=require('openai')
const User=require('./Schema');

const bcrypt=require('bcrypt');

// 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
require('dotenv').config();

mongoose.connect(process.env.DataBaseURL).then(()=>console.log("Database connected Succesfully")).catch((err)=>console.log(err,"Database not connected"))

const saltRound=10;
app.post('/register', async (req, resp) => {

    console.log("Request received:", req.body);

    const { name, email, phoneNo, password } = req.body; // Extract values properly

    try {
        const OldUser = await User.findOne({ email });
        if (OldUser) return resp.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = new User({ name, email, phoneNo, password: hashedPassword });
        await newUser.save();

        return resp.status(201).json({ status: 'OK', message: 'User Created' });

    } catch (error) {
        console.error("Error creating user:", error);
        return resp.status(500).json({ status: "Error", message: "Internal Server Error", error });
    }
});

app.post('/signin',async(req,resp)=>{
console.log(req.body);
return resp.status(200).send("Singin Succesfully");
//    try {
//     const OldUser=await User.findOne({email:req.body.email});
//     console.log(OldUser);
//     if(!OldUser)return resp.status(400).send({data:"User Doesn't Exist"});
//     const isMatch=await bcrypt.compare(req.body.password,OldUser.password);
//     console.log(isMatch);
//     if(!isMatch)return resp.status(401).send({data:"Incorrect Password"});
//     else return resp.status(200).send({data:"SignIn Successfully"})
//    } catch (error) {
//     console.log(error);
//     resp.status(500).send({status:"Server Error",data:error});
//    }
})


app.post('/chatapi', async (req, resp) => {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI,
    });
    const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1-distill-qwen-14b:free",
        messages: [
          {
            "role": "user",
            "content": `${req.body.input}`
          }
        ],
      });
      console.log(completion.choices[0].message);
   
});

 

app.listen(8001,()=>{
    console.log('Server at 8001 is started')
})