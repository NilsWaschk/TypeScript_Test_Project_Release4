import { Document } from "mongoose"
import { randomInt, randomFloat, randomSeason } from "./filldb"

export const erstelleFarben = () => {
    
    return [
        {
            farbe: "#000000",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Schwarz"
                }
            ]
        },
        {
            farbe: "#ffffff",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Weiß"
                }
            ]
        },
        {
            farbe: "#ff0000",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Rot"
                }
            ]
        },
        {
            farbe: "#0000ff",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Blau"
                }
            ]
        },
        {
            farbe: "#00ff00",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Grün"
                }
            ]
        },
        {
            farbe: "#ffff00",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Gelb"
                }
            ]
        },
        {
            farbe: "#a52a2a",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Braun"
                }
            ]
        },
        {
            farbe: "#ffa500",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Orange"
                }
            ]
        },
        {
            farbe: "bebebe",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Grau"
                }
            ]
        },
        {
            farbe: "#ffc0cb",
            farbbezeichnung: [
                {
                    lang: "de",
                    text: "Rosa"
                }
            ]
        }
    ]

}

export const erstelleKunden = (num : number) => {

    let Kunden = []

    for(let i = 1; i <= num; i++){

        Kunden.push({
            kundennummer: i,
            name: ("Kunde"+ i),
            preisliste: randomInt(5, 1)
        })

    }

    return Kunden

}

export const erstelleModelle = (num: number, farben: Array<Document>) => {

    let Modelle = []

    const modellCount = Math.floor(num/10)

    for(let i = 1; i <= modellCount; i++){

        for(let j = 1; j <= 10; j++){
            
            const colorCount = randomInt(farben.length, 1)
            let farbenAsSet = []
            
            while(farbenAsSet.length < colorCount){
            
            const selectedColor = farben[randomInt(farben.length-1)]
            const colorExists = farbenAsSet.find(farbe => farbe._id == selectedColor._id)
            
            if(colorExists) continue
            
            farbenAsSet.push(selectedColor)

            }

            Modelle.push({
                produktbereich: 1,
                saison: randomSeason(),
                modell: ("M"+i),
                artikel: ("A"+j),
                name: `Modell${i}Artikel${j}`,
                preis: randomFloat(100, 15),
                farben: farbenAsSet
            })
        
        }
           
    }

    return Modelle

}

export const erstelleAuftraege = (num : number, kunden: Array<Document>, modelle: Array<Document>) => {

    let auftraege = []
    const groessen : string[] = ["XS", "S", "M", "L", "XL"]

    for(let i = 1; i <= num; i++){

        let positionen = []

        for(let j = 1; j <= randomInt(20, 1); j++){

            let subpositionen  = []

            for(const groesse of groessen){

                subpositionen.push({
                    groesse: groesse,
                    menge: randomInt(20, 1)
                })

            }

            const selectedModell: any  = modelle[randomInt(modelle.length-1)]
            const priceDependency : boolean = randomInt(1) == 1
            let selectedPrice : number

            if(priceDependency){

                selectedPrice = selectedModell.preis + randomFloat(15, 5)

            } else {

                selectedPrice = selectedModell.preis

            }
            
            const selectedColor  = selectedModell.farben[randomInt(selectedModell.farben.length-1)]

            positionen.push({
                positionsnummer: j,
                artikel: selectedModell._id,
                farbe: selectedColor,
                preis: selectedPrice,
                subpositionen: subpositionen
            })

        }

        const selectedKunde = kunden[randomInt(kunden.length-1)]

        auftraege.push({
            produktbereich: 1,
            auftragssaison: randomSeason(),
            auftragsnummer: i,
            kunde: selectedKunde._id,
            positionen: positionen
        })

    }

    return auftraege

}

 
