import express from 'express'
import { getRoofs, getRoofsById } from '../controllers/roofs.js'

const router = express.Router()

router.get('/', getRoofs)
router.get('/:roofId', getRoofsById)

export default router