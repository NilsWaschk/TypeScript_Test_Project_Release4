import { dataType, dataTypes } from "../../types/controllerType";

export function schemaParser (rawSchema : Object){

    for(let [field, options] of Object.entries(rawSchema)){

        const nestedData = options.nested || {}

        delete options.nested

        const mongooseType = dataTypes[dataType[options.type]](nestedData)

        options.type = mongooseType

    }

    return rawSchema

}