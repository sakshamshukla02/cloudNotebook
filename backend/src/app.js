import cors from "cors"
import express from "express";
import {ApiError} from "./utils/apiError.js";

import userRouter from "./routes/user.route.js"

const app=express();
const corsOptions = {
    origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

app.use("/user",userRouter);

app.get("/",(async(req,res)=>{
    return res.status(200).json({
       message: "Hello User" 
    })
}))

app.use((req,res,err,next)=>{
    throw new ApiError(500,"Internal Server Error");
})
export {app};