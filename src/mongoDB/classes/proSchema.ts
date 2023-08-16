import { Model, Document } from "mongoose"
import { ControllerArray } from "../../types/controllerType"
import { Request, Response, Router } from "express"


export class proSchema{

    private myName : string
    private myModel : Model<Document>
    private myController : ControllerArray
    private myRouter : Router
    private myApi : string
    private population : Array<any>

    constructor(
        name: string, 
        model : Model<Document>, 
        controllerFunction : Function, 
        population: Array<any> = [],
        api : string  = "/api/v1/"
    ){
        this.myName = name
        this.myModel = model
        this.myController = this.initializeController(controllerFunction)
        this.myRouter = this.initializeRouter()
        this.myApi = api
        this.population = population.map(ele => ele.toJSON())
    }

    public getName(){
        return this.myName
    }

    public getModel(){
        return this.myModel
    }

    public getController(){
        return this.myController
    }

    public getRouter(){
        return this.myRouter
    }

    public getApi(){
        return this.myApi
    }

    public getPopulation(){
        return this.population
    }

    public generateApiPath(){
        return this.getApi().concat(this.getName())
    }

    private initializeController(controllerFunction: Function): ControllerArray{
        return controllerFunction(this.getModel())
    }


    private initializeRouter() : Router{
        const router = Router()

        for(const control of this.getController()){

            router[control.method](control.path, async (req: Request, res: Response) =>  {
                return await control.func(req, res, this.getPopulation())
            })

        }

        return router
    }

}