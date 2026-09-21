import mongoose from "mongoose";

let isConnected = false 

export const connectMongo = async () => {
    if (isConnected) return


    

    const config = useRuntimeConfig()
    await mongoose.connect(config.mongodbUri as string)
    isConnected = true
    console.log('MongoDB conectado')
}