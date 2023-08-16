import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { connectMongoDB } from "./mongoDB/mongoConnection"

import { TConfig } from "./types/configTypes"
import { TModel } from "./types/controllerType"

import { SchemahandlerModel as SchemaHandler } from "./mongoDB/collections/Schemahandler/schemahandler.model"
import { router as Schemahandler } from "./api/routes/schemahandler"
import { setup } from "./mongoDB/utils/handleSchema"
import { filldb } from "./tmp/filldb"

import schemas from "./tmp/schemas.json"

//! .env-Setup
declare global {
    namespace NodeJS{
        interface ProcessEnv{
            MONGO_URI: string,
            PORT: number
        }
    }    
}
dotenv.config()

const allowedOrigins = ["http://localhost:8080"]
const corsOptions : cors.CorsOptions =  {
    origin: allowedOrigins
}

const proConfig:TConfig = Object.freeze({
    createTestData: false,
    createSchema : false
})

const main = async (config: TConfig): Promise<void> => {

    await connectMongoDB(process.env.MONGO_URI)

    const app = express();
        app.use(express.json())
        app.use(cors(corsOptions))
        app.use("/api/v1/schema", Schemahandler)

    const port = process.env.PORT || 5000

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`)
    })

    if(config.createSchema){

        try {
            
            await SchemaHandler.create(schemas)

        } catch (error: any) {
            
            console.error(error)

            return

        }

    }

    const Models: TModel = {}

    for(const schema of await setup()){

        app.use(schema.generateApiPath(), schema.getRouter())

        if(config.createTestData){
            Models[schema.getName()] = schema.getModel()
        }

    } 

    console.log("Schemas loaded!")

    Object.freeze(Models)

    if(config.createTestData){
        
        await filldb(Models)

    }

    console.log("Application is ready!")

}

main(proConfig)






