import { Schema } from 'mongoose'

const SchemahandlerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mySchema: {
        type: Schema.Types.Mixed,
        required: true
    },
    options: {
        type: new Schema({
            versionKey: {
                type: Boolean,
                default: false
            }
        }, {versionKey: false, _id: false})
    },
    population: {
        type: [new Schema({
            path: {
                type: String,
                required: true
            },
            select: {
                type: String
            },
            model: {
                type: String
            },
            match: {
                type: String
            }

        }, {versionKey: false, _id: false})]
    }
}, {versionKey: false})

export default SchemahandlerSchema