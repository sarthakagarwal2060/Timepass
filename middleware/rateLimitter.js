import ratelimit from "../config/upstash.js";

export const rateLimiter = async(req,res,next)=>{
    try{
        const {success} = await ratelimit.limit("My-key")
        if(!success) return res.status(429).json({message:"Too many Request"})
            next()

    }   
    catch(err){
        console.log("Rate Limit error",err);
        next(err)
        
    }
}