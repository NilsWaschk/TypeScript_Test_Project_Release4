import { Request, Response } from 'express'
import { Document, Model } from 'mongoose'
import { ControllerArray } from '../../types/controllerType'

import findByObjectIdOrUniqueField from '../utils/findByObjectIdOrUniqueField'

export default function AuftragsController (Auftraege : Model<Document>) : ControllerArray {

    return [   
    
        {        
            func: async (req: Request, res: Response, pathsToPopulate: Array<any>) => {

                const body = req.body
                const param = req.params.param 
        
                try{
            
                    const auftraege = await Auftraege
                        .findOne(findByObjectIdOrUniqueField(param, "auftragsnummer"))
                        .populate(pathsToPopulate)

                    if(!auftraege) throw new Error('Auftrag konnte nicht gefunden werden!')
            
                    res.status(200).json(auftraege)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
    
            },
            method: "get",
            path: "/find/:param"
        },
        {    
            func: async (req: Request, res: Response, pathsToPopulate: Array<any>) => {
                const body = req.body
                const param = req.params.param 
            
                const filter = body.filter || body
                const projection = body.projection || {}
                const populate = body.populate || false
                

                try{
            
                    const auftraege = await Auftraege
                        .find(filter, projection)
                        .populate(populate ? pathsToPopulate : "")

                    if(!auftraege) throw new Error('Aufträge konnten nicht gefunden werden!')
            
                    res.status(200).json(auftraege)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
            
            },
            method: "post",
            path: "/find"
        }
        
    ]

}
