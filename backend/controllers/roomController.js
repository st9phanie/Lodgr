import { populate } from "dotenv";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId })

        if (!hotel) {
            return res.json({ success: false, message: "No Hotel Found" })
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const fileBuffer = req.file.buffer;
        const fileName = `rooms/${Date.now()}_${req.file.originalname}`;

        for (const file of req.files) {
            const fileName = `rooms/${Date.now()}_${file.originalname}`;
            const { data, error } = await supabase.storage
                .from("Images")
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false,
                });

            if (error) {
                return res.status(500).json({ success: false, message: "Image upload failed: " + error.message });
            }

            // Get public URL of uploaded image
            const { publicUrl } = supabase.storage
                .from('Images')
                .getPublicUrl(data.path);

            uploadedImageUrls.push(publicUrl);
        }

        const newRoom = await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            image: uploadedImageUrls,
        });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true }).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: 'image'
            }
        }).sort({ createdAt: -1 })
        res.json({ success: true, rooms })
    } catch (error) {
        res.json({ success: false, messag: error.message })

    }
}

export const getOwnerRooms = async (req, res) => {
    try {
        const hotelData = await Hotel({ owner: req.auth.userId })
        const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel")
        res.json({ success: true, rooms })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        roomData = await Room.findById(roomId)
        roomData.isAvailable = !roomData.isAvailable
        await roomData.save()
        res.json({ success: true, message: "Room availability updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}