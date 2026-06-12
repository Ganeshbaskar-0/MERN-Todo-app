import mongoose from "mongoose"


const todoSchema = new mongoose.Schema({
    title:String,
    description:String
}
)

const todoModel = mongoose.model("Todo",todoSchema)

export default todoModel