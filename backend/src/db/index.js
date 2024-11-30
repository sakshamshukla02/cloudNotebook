import mongoose from "mongoose";
import env from "dotenv"

env.config()

const connectDB=async()=>{
    try{
        const connectInstance=await mongoose.connect(`${process.env.DATABASE_URL}`);
        // console.log("MongoDB is connected! ",connectInstance.connection.host);
    }
    catch(err){
        console.log("MongoDB disconnected",err);
        // process.exit(1);
    }
}

export default connectDB;