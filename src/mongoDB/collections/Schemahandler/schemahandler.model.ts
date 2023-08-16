import { Document, model } from 'mongoose'
import { ISchemahandlerDocument } from './schemahandler.types'
import SchemahandlerSchema from './schemahandler.schema'

export const SchemahandlerModel = model<ISchemahandlerDocument>('schema', SchemahandlerSchema)