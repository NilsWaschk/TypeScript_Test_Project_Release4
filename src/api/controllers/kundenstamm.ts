import { Request, Response } from 'express'
import { Document, Model } from 'mongoose'
import { ControllerArray } from '../../types/controllerType'

import findByObjectIdOrUniqueField from '../utils/findByObjectIdOrUniqueField'

export default function KundenstammController (Kundenstamm: Model<Document>) : ControllerArray {

    return [
        {
            func: async (req: Request, res: Response) => {
                const body = req.body
                const param = req.params.param 
            
                try{
            
                    const kundenstamm = await Kundenstamm.findOne(findByObjectIdOrUniqueField(param, "kundennummer"))
                    if(!kundenstamm) throw new Error('Kunde konnte nicht gefunden werden')
            
                    res.status(200).json(kundenstamm)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
            
            },
            method: "get",
            path: "/find/:param"
        },
        {
            func: async (req: Request, res: Response) => {
                const body = req.body
                const param = req.params.param 
            
                try{
            
                    const kundenstamm = await Kundenstamm.find(body)
                    if(!kundenstamm) throw new Error('Kunden konnten nicht gefunden werden!')
            
                    res.status(200).json(kundenstamm)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
            
            },
            method: "post",
            path: "/find"
        }
    ]

}
