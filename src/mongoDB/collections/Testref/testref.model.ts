import { model } from 'mongoose'
import { ITestrefDocument } from './testref.types'
import TestrefSchema from './testref.schema'

export const TestrefModel = model<ITestrefDocument>('testreference', TestrefSchema, "testreference")
