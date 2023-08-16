import { Request, Response } from 'express'
import { SchemahandlerModel as Schemahandler } from '../../mongoDB/collections/Schemahandler/schemahandler.model'

const controller = {

    getSchemas: async (req: Request, res: Response) => {
        const body = req.body
        const param = req.params.param 
    
        try{
    
            const schemahandler = await Schemahandler.find({})
            if(!schemahandler) throw new Error('Failed to find Schemas')
    
            res.status(200).json(schemahandler)
    
        } catch (error: any) {
    
            res.status(400).json({message: error.message})
    
        }
    
    },
    postSchema: async (req: Request, res: Response) => {
        const body = req.body
        const param = req.params.param 
    
        try{
    
            const schemahandler = await Schemahandler.create(body)
            if(!schemahandler) throw new Error('Failed to create new Schmea')
    
            res.status(200).json(schemahandler)
    
        } catch (error: any) {
    
            res.status(400).json({message: error.message})
    
        }
    
    },
    

}

export default controller