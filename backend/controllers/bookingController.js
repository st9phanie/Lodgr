import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

export const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lt: checkOutDate },
            checkOutDate: { $gt: checkOutDate },
        })

        const isAvailable = bookings.length === 0;
        return isAvailable

    } catch (error) {
        console.error(error.message)
    }
}

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room })
        res.json({ success: true, isAvailable })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id

        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room })

        if (!isAvailable) {
            res.status(400).json({ success: false, message: "Room is not available" })
        }

        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        const checkin = new Date(checkInDate)
        const checkout = new Date(checkOutDate)
        const timeDiff = checkout.getTime() - checkin.getTime()
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))

        totalPrice *= nights

        const booking = await Booking.create({ user, room, hotel: roomData.hotel._id, guests: +guests, checkInDate, checkOutDate, totalPrice })

        res.status(201).json({ success: true, message: "Booking created successfully" })

    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to create booking" })
    }
}

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 })
        res.json({ success: true, bookings })

    } catch (error) {
        res.json({ success: false, message: "Failed to fetch bookings" })

    }
}

export const getHotelBookings = async (req, res) => {
   try { const hotel = await Hotel.findOne({ owner: req.auth.userId })
    if (!hotel) {
        return res.json({ success: false, message: "No Hotel found" })
    }
    const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 })

    const totalBookings = bookings.length
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)
    res.json({ success: true, dashboardData: { totalBookings, totalRevenue,bookings } })}
    catch(error){
        res.json({ success: false, message:"Failed to fetch bookings" })
    }

}