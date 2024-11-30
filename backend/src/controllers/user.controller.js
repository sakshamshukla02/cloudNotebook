import userRouter from "../routes/user.route.js"

import {asyncHandler} from "../utils/asyncHandler.js"

import { User } from "../models/user.models.js"

import {ApiError} from "../utils/apiError.js"

import {ApiResponse} from "../utils/apiResponse.js"


const registerUser=asyncHandler(async(req,res)=>{

    const {username,password}=req.body;

    if([username,password].some((val)=>val?.trim()==""))
    {
        return res.status(200).json(
            new ApiResponse(410,"All fields required","All fields required")
        )
    }
    const existedUser=await User.findOne({
        username
    })
   
    if(existedUser)
    {
        
        
        return res.status(200).json(
            new ApiResponse(410,"User Already exists","User Already exists")
        )
        
    }
    

    const user=await User.create({
        username,
        password,
    })

    
    const createdUser=await User.findById(user._id).select("-password");

    if(!createdUser)
    {
        throw new ApiError(500,"Something went wrong")
    }

    return res.status(201).json(new ApiResponse(200,createdUser,"User Created Successfully"))
})


const loginUser=asyncHandler(async(req,res)=>{
    
    const{username,password}=req.body;

    if([username,password].some((val)=>val?.trim()==""))
    {
        return res.status(200).json(
            new ApiResponse(410,"All fields required","All fields required")
        )
    }
    

    const user=await User.findOne({
        username
    });
    if(!user)
    {
        return res.status(200).json(
            new ApiResponse(410,"User Not Registered","User Not Registered")
        )
    }
    
    const isPasswordValid=await user.isPasswordCorrect(password);
   
    if(!isPasswordValid)
    {
        return res.status(200).json(
            new ApiResponse(410,"Invalid Password","Invalid Password")
        )
    }

    const loggedInUser=await User.findOne(user._id).select("-password");

    return res.status(200).json(
        new ApiResponse(200,loggedInUser,"User Logged In Successfully")
    )

})


const addNotes=asyncHandler(async(req,res)=>{
    const {id,title,description}=req.body;

    const userNote=await User.findOneAndUpdate({_id:id},{
        $push:{content:{
            title,
            description
        }}
    },{new:true}).select("-password");
    
    return res.status(200).json(
        new ApiResponse(200,userNote,"Notes added successfully")
    );
})

const updateNotes=asyncHandler(async (req,res)=>{
    
    const{id,contentId,title,description}=req.body;

    const updatedNote=await User.findOneAndUpdate({
        _id:id,
        "content._id":contentId
    },
    {
        $set:{
            "content.$.title":title,
            "content.$.description":description,
        }
    },{
        new:true
    }).select("-password");

    return res.status(200).json(
        new ApiResponse(200,updatedNote,"Notes Updated Successfully")
    )
})


const deleteNotes=asyncHandler(async(req,res)=>{
    const {id,contentId}=req.body;
   
    const deletedNote=await User.findOneAndUpdate({
        _id:id,
        
    },{
        $pull:{
           content:{
            _id:contentId
           }
        }
    },{
        new:true
    }).select("-password")

    return res.status(200).json(
        new ApiResponse(200,deletedNote,"Note deleted successfully")
    )

})

const displayNotes=asyncHandler(async(req,res)=>{
    const{id}=req.body;

    const user=await User.findById({_id:id}).select("-password -username");
    return res.status(200).json(
        new ApiResponse(200,user,"Data Fetched Successfully")
    )
})



export {registerUser,loginUser,addNotes,updateNotes,deleteNotes,displayNotes};