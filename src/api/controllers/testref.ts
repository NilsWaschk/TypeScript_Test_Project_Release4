import { Request, Response } from 'express'
import { TestrefModel as Testref } from '../../mongoDB/collections/Testref/testref.model'

const controller = {

    createNew: async (req: Request, res: Response) => {
        const body = req.body
        const param = req.params.param 
    
        try{
    
            const testref = await Testref.create(body)
            if(!testref) throw new Error('hallo test123')
    
            res.status(200).json(testref)
    
        } catch (error: any) {
    
            res.status(400).json({message: error.message})
    
        }
    
    },
    find: async (req: Request, res: Response) => {
        const body = req.body || {}
        const param = req.params.param 
    
        try{
    
            const testref = await Testref.find(body)
            if(!testref) throw new Error('adadd')
    
            res.status(200).json(testref)
    
        } catch (error: any) {
    
            res.status(400).json({message: error.message})
    
        }
    
    },
    

}

export default controller