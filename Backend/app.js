const express = require('express')
const app = express();
const mongoose = require('mongoose')
app.use(express.json());
const OpenAI = require('openai')
const User = require('./Schema');
// const PROMPT = require('../services/PROMPT');
const bcrypt = require('bcrypt');
const axios = require('axios');

// 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
require('dotenv').config();

mongoose.connect(process.env.DataBaseURL).then(() => console.log("Database connected Succesfully")).catch((err) => console.log(err, "Database not connected"))

const saltRound = 10;
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

app.post('/signin', async (req, resp) => {
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


app.post('/chatapi', async (req, res) => {
    console.log(req.body?.prompt);
    if (!req.body?.prompt) {
        return res.status(400).json({ error: "Input is required" });
    }
    try {
        const completion = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemma-3-4b-it:free",
                "messages": [
                    {
                        "role": "user",
                        content: req.body.prompt
                    }
                ],
                response_format: { type: 'json_object' }
            })
        });
        const data = await completion.json();
        console.log(data);
        res.status(200).send(data);

    } catch (error) {
        console.error("❌ Error from OpenRouter:", error?.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.post('/photoAPI', async (req, resp) => {
    console.log("body",req.body)
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

app.listen(8001, () => {
    console.log('Server at 8001 is started')
})