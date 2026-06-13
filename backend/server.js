import express from "express"
import userRoutes from "./routes/user.js"
import connectDB from "./db.js"
import dotenv from "dotenv"
import todoModel from "./models/list.js"
import cors from "cors"

const app = express()


app.use(express.json())
app.use(cors())
dotenv.config()
connectDB();


app.use("/todos",userRoutes)



const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})
