import * as dotenv from "dotenv"
import * as mongo from "mongoose"

dotenv.config()

export const connectMongoDB = async (mongoUri : string): Promise<void> => {

    try{
        
        const client = await mongo.connect(mongoUri)

        console.log("Connected to Database:", client.connection.name)
        
    } catch (e) {

        console.error("Failed to Connect to Mongo DB", e)

    }
    
}