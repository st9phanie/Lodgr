import User from "../models/User.js";

//check if user is auth

export const protect = async(req,res,next) => {
    const {userId} = req.auth;
    if(!userId){
        res.status(401).json({success:false, message:"not authenticated"})
    }else{
        const user = await User.findById(userId);
        req.user = user;
        next()
    }
}