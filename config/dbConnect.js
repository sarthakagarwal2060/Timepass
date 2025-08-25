import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export default async function dbConnect(){
    try{
        await mongoose.connect(process.env.mongo_url)
        console.log("Mongo connected successfully!");
        
    }
    catch(err){
        console.log("Failed to connect",err);
        process.exit(1)
        
    }
} 