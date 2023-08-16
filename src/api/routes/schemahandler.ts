import { Router } from 'express'
import controller from '../controllers/schemahandler'

export const router = Router()

router.get("/", controller.getSchemas)
router.post("/", controller.postSchema)