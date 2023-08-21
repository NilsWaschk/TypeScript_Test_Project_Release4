import { Router } from 'express'
import controller from '../controllers/testref'

export const router = Router()

router.post("/", controller.createNew)

router.post("/find", controller.find)