import User from "../models/User.js";
import Hotel from "../models/Hotel.js";

export const registerHotel = async (req,res) => {
    try {
        const {name,address,contact,city} = req.body;
        const owner = req.user._id

        const hotel = await Hotel.findOne({owner})
        if(hotel){
            return res.json({success:false, message:"Hotel Already Registered"})
        } 

        await Hotel.create({name,address,contact,city,owner})
        await User.findByIdAndUpdate(owner,{role:"host"})

        return res.json({success:true, message:"Hotel Registered Successfully" })

    } catch (error) {
        return res.json({success:false, message:error.message })
    }
}