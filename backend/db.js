import mongoose from "mongoose"

const ConnectDb = 
async ()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database Connected");
    }
    catch(error)
    {
        console.log(`Message:$${error.message}`)
        
    }
}

export default ConnectDb;