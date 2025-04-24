const express = require('express')
const app = express();
const mongoose = require('mongoose')
app.use(express.json());
const OpenAI = require('openai')
const User = require('./Schema');
// const PROMPT = require('../services/PROMPT');
const bcrypt = require('bcrypt');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Auth = require('./middleware/authMiddleware')
const cookieParser = require('cookie-parser')


app.use(cookieParser())

require('dotenv').config();

mongoose.connect(process.env.DataBaseURL).then(() => console.log("Database connected Succesfully")).catch((err) => console.log(err, "Database not connected"))

const saltRound = 10;
app.post('/register', async (req, resp) => {
    const { name, email, phoneNo, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // saltRound = 10
        const newUser = new User({ name, email, phoneNo, password: hashedPassword });
        await newUser.save();

        // const token = jwt.sign(
        //     { id: newUser._id, email: newUser.email },
        //     process.env.JWT_SECRET || 'your_secret_key',
        //     { expiresIn: '1d' }
        // );
        const token = jwt.sign(
            { _id: newUser._id, email: newUser.email }, // <== includes _id
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
          );


        return resp.status(201).json({
            status: 'OK',
            message: 'User created successfully',
            token,
            user: req.body
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return resp.status(500).json({
            status: "Error",
            message: "Internal Server Error",
            error: error.message
        });
    }
});


app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log("1");
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials - User not found' });
        }
        console.log("2");
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials - Password mismatch' });
        }
        console.log("3");
        const token = jwt.sign(
            { _id: user._id, email: user.email }, // <== includes _id
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
          );
        console.log("4");
        console.log(token);

        res.status(200).json({ message: 'Sign in successful', token, user: user });
    } catch (error) {
        console.error('Error during sign in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.post(`/chatapi/:id`, Auth, async (req, res) => {
    const { id } = req.params;
    const prompt = req.body?.prompt;
    const userId = req.user?._id;
  
    console.log("id:", id);
    console.log("prompt:", prompt);
  
    if (!prompt) {
      return res.status(400).json({ error: "Input is required" });
    }
  
    try {
      const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI2}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3-4b-it:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          response_format: { type: "json_object" },
        }),
      });
  
      const data = await completion.json(); // ✅ FIX: move this up before trying to use `data`
  
      // ✅ Only save response to DB if id == '2' and user is authenticated
      if (id === '2' && userId) {
        await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              history: {
                response: data, // Push full response
                searchedAt: new Date(),
              },
            },
          },
          { new: true }
        );
      }
  
      console.log("Completion response:", data);
      res.status(200).json(data);
  
    } catch (error) {
      console.error("❌ Error from OpenRouter:", error?.response?.data || error.message);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  

app.post('/photoAPI', Auth, async (req, resp) => {
    console.log("body", req.body)
    // console.log()
    console.log(req.body?.ImagePrompt)
    // console.log(process.env.PhotoAPI)
    try {
        const BASE_URL = 'https://aigurulab.tech';
        const result = await axios.post(BASE_URL + '/api/generate-image',
            {
                width: 1024,
                height: 1024,
                input: req.body.ImagePrompt,
                model: 'sdxl',
                aspectRatio: "1:1"
            },
            {
                headers: {
                    'x-api-key': process.env.PhotoAPI, // Your API Key
                    'Content-Type': 'application/json', // Content Type
                },
            })
        console.log(result.data.image)
        resp.status(201).send(result.data.image);
    } catch (error) {
        console.log("Error in photogeneration API: ", error);
        resp.status(404).send("Error: ", error);
    }
})

app.get('/fetch', Auth, async (req, res) => {
    console.log("working");
    try {
      const userId = req.user._id;
  
      const user = await User.findById(userId).select('history'); // only select history field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user.history);
  
    } catch (error) {
      console.error("❌ Error fetching user history:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.delete('/delete/:index',Auth,async(req,res)=>{
    const userId = req.user._id;
    const index = parseInt(req.params.index, 10);
    console.log(userId,index);
  
    try {
      const user = await User.findById(userId);
  
      if (!user || !user.history || index < 0 || index >= user.history.length) {
        return res.status(404).json({ success: false, message: 'Invalid index or no history found' });
      }
  
      user.history.splice(index, 1);
      await user.save();
  
      res.json({ success: true, message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  })

app.listen(8001, () => {
    console.log('Server at 8001 is started')
})