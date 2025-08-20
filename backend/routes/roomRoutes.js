import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";

const roomRouter = express.Router()

hotelRouter.post("/", upload.array("images",4),protect, createRoom)
hotelRouter.get("/", getRooms)
hotelRouter.get("/owner", protect, getOwnerRooms)
hotelRouter.post("/toggle-availability", protect, toggleRoomAvailability)

export default roomRouter;