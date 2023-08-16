import { Request, Response } from "express";
import { Document, Model } from "mongoose";
import { ControllerArray } from "../../types/controllerType";

import findByObjectIdOrUniqueField from "../utils/findByObjectIdOrUniqueField";

export default function FarbenController (Farben : Model<Document>) : ControllerArray{
    
    return [
        
        { 
            func : async (req: Request, res: Response) => {
                const body = req.body
                const param = req.params.param 

                try{
            
                    const farben = await Farben.create(body)
                    if(!farben) throw new Error('Fehler beim erstellen einer neuen Farbe')
            
                    res.status(200).json(farben)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
            
            },
            method: "post",
            path: "/"
        },
        {
            func: async (req: Request, res: Response) => {
                const body = req.body
                const param = req.params.param 
            
                try{
            
                    const farben = await Farben.findOne(findByObjectIdOrUniqueField(param, "farbe", "#"))
                    if(!farben) throw new Error('Farbe konnte nicht gefunden werden')
            
                    res.status(200).json(farben)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
            
            },
            method: "get",
            path: "/find/:param"
        },
        {
            func : async (req: Request, res: Response) => {
                const body = req.body
                const param = req.params.param 
            
                try{
            
                    const farben = await Farben.find(body)
                    if(!farben) throw new Error('Farbe konnte nicht gefunden werden')
            
                    res.status(200).json(farben)
            
                } catch (error: any) {
            
                    res.status(400).json({message: error.message})
            
                }
            
            },
            method: "post",
            path: "/find"
        },
        
    ]
}
