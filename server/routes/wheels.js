import express from 'express'
import { getWheels, getWheelsById } from '../controllers/wheels.js'

const router = express.Router()

router.get('/', getWheels)
router.get('/:wheelId', getWheelsById)

export default router