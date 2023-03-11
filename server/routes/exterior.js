import express from 'express'
import { getExteriors, getExteriorById } from '../controllers/exterior.js'

const router = express.Router()

router.get('/', getExteriors)
router.get('/:extId', getExteriorById)

export default router