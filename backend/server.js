import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"

connectDB()

const app = express()
app.use(cors())
app.use(clerkMiddleware())

app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }), // This is crucial for Svix
  clerkWebhooks
);

app.use(express.json())

app.get('/',(req,res)=> (
    res.send("hi")
))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`)
);