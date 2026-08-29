import mongoose from 'mongoose'
import dns from 'dns'; 
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
export async function connectDB() {                          
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log('CONNECTED TO MONGODB CLUSTER')
    } catch (error) {
        console.error("Error connecting to mongo db", error)
        process.exit(1)
    }
};