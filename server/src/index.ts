import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect"
import cors from "cors"
import authRoute from "./routes/authRoute"
import postRoute from "./routes/postRoute"
import errorHandler from "./middlewares/errorHandler"
import notFound from "./middlewares/noFound"
import { infoLogger } from "./lib/utils/logger"


dotenv.config()

dbConnect()

const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/posts", postRoute)

app.use(notFound)

app.use(errorHandler)
const port = process.env.PORT || 3000

app.listen(port, () => {
  infoLogger(`Server is running on port ${port}`)
})