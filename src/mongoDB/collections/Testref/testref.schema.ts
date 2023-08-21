import { Document } from 'mongodb'
import { Schema, SchemaType } from 'mongoose'

const keyFields = ["name", "rndid"]

type fTypeScript = {
    [key: string] : any
}

const TestrefSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rndid: {
        type: Schema.Types.Number,
        required: true
    },
    keyField: {
        type: Schema.Types.Mixed,
    }
}, {versionKey: false})

TestrefSchema.pre("save", function(next){

    const parsedObject: fTypeScript = this.toObject()

    const createKeyField = keyFields.map(ele => parsedObject[ele]).join("")

    this.keyField = createKeyField

    next()

})

export default TestrefSchema
