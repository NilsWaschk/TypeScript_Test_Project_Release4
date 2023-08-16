import { Document, Model } from 'mongoose'

export interface ISchemahandler {
    name: string
    collectionName: string
    mySchema: string
    options: object
    population: Array<any>
}

export interface ISchemahandlerDocument extends ISchemahandler, Document {}
export interface ISchemahandlerModel extends Model<ISchemahandlerDocument> {}

