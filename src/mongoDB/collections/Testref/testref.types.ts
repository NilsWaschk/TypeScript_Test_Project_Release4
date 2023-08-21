import { Document, Model } from 'mongoose'

export interface ITestref {
    name: string,
    rndid: number,
    keyField?: any
}

export interface ITestrefDocument extends ITestref, Document {}
export interface ITestrefModel extends Model<ITestrefDocument> {}