import { Document } from "mongoose"
import { TModel } from "../types/controllerType"
import { 
    erstelleFarben, 
    erstelleKunden, 
    erstelleModelle, 
    erstelleAuftraege 
} from "./filldb.data"


export function randomInt (max: number, min = 0) : number {

    return Math.floor(Math.random() * (max - min + 1) + min)

}

export function randomFloat (max: number, min = 0) : number {

    return parseFloat((Math.random() * (max - min + 1) + min).toFixed(2))

}

export function randomSeason() : string {

    const seasons = ["Spring", "Summer", "Fall", "Winter"]
    const years = [21, 22, 23]

    return [seasons[randomInt(seasons.length-1)], years[randomInt(years.length-1)]].join(" ")

}

export async function filldb (Models: TModel) {

    const numOfAuftraege : number =  10000

    let FarbenData : Array<Document> = []
    let KundenData : Array<Document> = []
    let ModellstammData : Array<Document> = []
    let AuftraegeData : Array<Document> = []
    
    try {
        
        console.log("Erstelle Farben...")

        FarbenData = await Models.farben.create(erstelleFarben())

        if(!FarbenData) throw new Error("Fehler beim erstellen von Farben")

        console.log("Farben erfolgreich erstellt!")

    } catch (error: any) {
        
        console.error(error)

    }

    try {
        
        console.log("Erstelle Kundenstamm...")

        KundenData = await Models.kundenstamm.create(erstelleKunden(100))

        if(!KundenData) throw new Error("Fehler beim erstellen von Kundenstamm")

        console.log("Kundenstamm erfolgreich erstellt!")

    } catch (error: any) {
        
        console.error(error)

    }

    try {
        
        console.log("Erstelle Modellstamm...")

        ModellstammData = await Models.modellstamm.create(erstelleModelle(1000, FarbenData))

        if(!ModellstammData) throw new Error("Fehler beim erstellen von Modellstamm")

        console.log("Modellstamm erfolgreich erstellt!")

    } catch (error: any) {
        
        console.error(error)

    }

    try {
        
        console.log("Erstelle Aufträge...")

        const numOfIterations : number = Math.floor(numOfAuftraege/1000)
        const auftraege = erstelleAuftraege(numOfAuftraege, KundenData, ModellstammData)
        
        for(let i = 0; i < numOfIterations; i++){

            const start : number = i*1000
            const end: number = (i+1)*1000

            const slicedAuftreage = auftraege.slice(start, end)
            
            AuftraegeData = await Models.auftraege.create(slicedAuftreage)

            if(!AuftraegeData) throw new Error("Fehler beim erstellen von Aufträge")
        
            console.log(end, " Aufträge wurden erstellt!")

        }

        console.log("Aufträge erfolgreich erstellt!")

    } catch (error: any) {
        
        console.error(error)

    }


    console.log("Datenbank vollständig befüllt")

}