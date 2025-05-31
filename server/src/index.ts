import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect"
import cors from "cors"
import authRoute from "./routes/authRoute"


dotenv.config()

dbConnect()

const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())

app.use("/api/auth",authRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})