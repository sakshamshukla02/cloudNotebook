import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authenticate=asyncHandler(async(req,res,next)=>{
    const {id}=req.body;
    const userExist=await User.findById(id);
    if(!userExist)
    {
        throw new ApiError(400,"Not a registered User")
    }
    next();
})

export {authenticate};