import { Request, Response } from 'express'
import { Document, Model } from 'mongoose'
import { ControllerArray } from '../../types/controllerType'

import findByObjectIdOrUniqueField from '../utils/findByObjectIdOrUniqueField'

export default function ModellstammController(Modellstamm : Model<Document>) : ControllerArray {

    return [
        {
            func: async (req: Request, res: Response, pathsToPopulate: Array<any>) => {
                const body = req.body
                const param = req.params.param 
             
                try{
            
                    const modellstamm = await Modellstamm
                    .findOne(findByObjectIdOrUniqueField(param, "name")).populate(pathsToPopulate)
                    if(!modellstamm) throw new Error('Modell konnte nicht gefunden werden!')
            
                    res.status(200).json(modellstamm)
            
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

                try{
            
                    const modellstamm = await Modellstamm
                        .find(body)
                        .populate(pathsToPopulate)

                    if(!modellstamm) throw new Error('Modelle konnten nicht gefunden werden!')
            
                    res.status(200).json(modellstamm)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
            
            },
            method: "post",
            path: "/find"         
        },
        {
            func: async (req: Request, res: Response) => {
                const body = req.body
                const param = req.params.param 
            
                try{
            
                    const modellstamm = await Modellstamm.create(body)
                    if(!modellstamm) throw new Error('asdshadskhja')
            
                    res.status(200).json(modellstamm)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
            
            },
            method: "post",
            path: ""
        }
    ]

}
