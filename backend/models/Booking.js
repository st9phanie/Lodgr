import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user: { type: String, required: true, ref: "User" },
    room: { type: String, required: true, ref: "Room" },
    hotel: { type: String, required: true, ref: "Hotel" },

    checkInDate: { type: Date, required: true },
    chckOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    guests: { type: Date, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    paymentMethod: { type: String, required:true, default: "Pay At Hotel" },
    isPaid: {type:Boolean, default: false}

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;