import { Document, model, Schema } from "mongoose";
import { ISchemahandlerDocument } from "../collections/Schemahandler/schemahandler.types";
import { SchemahandlerModel } from "../collections/Schemahandler/schemahandler.model";
import { default as Controls }from "../../api/controller";
import { schemaParser } from "./schemaParser";
import { proSchema } from "../classes/proSchema";

export async function setup (){

    let proSchemas: proSchema[] = []

    try {
        
        const Schemas : ISchemahandlerDocument[] = await SchemahandlerModel.find({})

        for(const schema of Schemas){

            const tempSchema = new Schema(schemaParser(schema.mySchema), schema.options)
            const tempModel = model<Document>(schema.name, tempSchema, schema.name)

            proSchemas.push(new proSchema(schema.name, tempModel, Controls[schema.name], schema.population)) 

        }

    } catch (error) {

        console.error(error)

    }

    return proSchemas

}