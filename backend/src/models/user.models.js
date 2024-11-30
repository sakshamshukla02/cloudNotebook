import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"

const contentSchema=new Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    }
})

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    content:[contentSchema]
},{
    timestamps:true
});

userSchema.pre("save",async function(next){
   
if(!this.isModified("password"))
    {
        return next();
    }
    this.password= await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password)
{
    try{
       
    return await bcrypt.compare(password,this.password);
    }
    catch(err)
    {
        // console.log(err);
    }
}

export const User=mongoose.model("User",userSchema);