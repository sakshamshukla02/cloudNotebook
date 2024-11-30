import cors from "cors"
import express from "express";
import {ApiError} from "./utils/apiError.js";

import userRouter from "./routes/user.route.js"

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/user",userRouter);


















app.use((req,res,err,next)=>{
    console.log("Error occured")
    throw new ApiError(500,"Internal Server Error");
})
export {app};