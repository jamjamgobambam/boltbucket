import express from 'express'
import { getInteriors, getInteriorById } from '../controllers/interior.js'

const router = express.Router()

router.get('/', getInteriors)
router.get('/:intId', getInteriorById)

export default router