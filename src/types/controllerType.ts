import { Document, Model, Schema } from "mongoose"

import { schemaParser } from "../mongoDB/utils/schemaParser"

export type ControllerEntry = {
    func: Function
    method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
    path: string
}

export type ControllerArray = [...ControllerEntry[]]

export type Controller = {
    [key: string] : Function
}

export type TModel = {
    [key: string] : Model<Document>
}

export const dataTypes:Controller = Object.freeze({
    Array : () => {
        return Schema.Types.Array
    },
    Boolean : () => {
        return Schema.Types.Boolean
    },
    Buffer : () => {
        return Schema.Types.Buffer
    },
    Date : () => {
        return Schema.Types.Date
    },
    Decimal128 : () => {
        return Schema.Types.Decimal128
    },
    DocumentArray : (nestedData : Object) => {
        return [new Schema(schemaParser(nestedData), {versionKey: false, _id: false})]
    },
    Map : () => {
        return Schema.Types.Map
    }, 
    Mixed : () => {
        return Schema.Types.Mixed
    },
    Number : () => {
        return Schema.Types. Number
    },
    ObjectId : () => {
        return Schema.Types.ObjectId
    },
    String : () => {
        return Schema.Types.String
    },
    Subdocument : (nestedData: Object) => {
        return new Schema(schemaParser(nestedData), {versionKey: false, _id: false})
    },
    UUID : () => {
        return Schema.Types.UUID
    },
    ReferenceArray : (nestedData: any) => {        
        nestedData.type = dataTypes[dataType[nestedData.type]]()
        return [nestedData]
    }
})


export enum dataType {
    Array,
    Boolean,
    Buffer,
    Date,
    Decimal128,
    DocumentArray,
    Map,
    Mixed,
    Number,
    ObjectId,
    String,
    Subdocument,
    UUID,
    ReferenceArray 
}