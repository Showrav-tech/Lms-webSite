import mongoose from "mongoose";

const connectDB = async ()=>{
momgose.connection.on('connected',()=>console.log('Database Connected')
)

await mongoose.connect(`${process.env.MONGODB_URI}/lms`)

}

export default connectDB