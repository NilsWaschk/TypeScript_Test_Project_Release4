import { Types, isObjectIdOrHexString } from "mongoose"

declare interface queryObjectUnique {
    [key: string]: Types.ObjectId|number|string
}

function findByObjectIdOrUniqueField(value : string, fieldName : string, prefix = "") : queryObjectUnique{

    const concatedValue = prefix + value

    if(isObjectIdOrHexString(concatedValue)){

        return {_id : new Types.ObjectId(concatedValue)}

    } else {

        return {[fieldName] : concatedValue}

    }

}

export default findByObjectIdOrUniqueField