import express from "express";
import env from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
env.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is running at port ",process.env.PORT);
    })
}).catch((err)=>{
    console.log("Connection Failed",err);
})
