import express from 'express'
import { getCustomCars, getCustomCarById, createCustomCar, deleteCustomCar, updateCustomCar } from '../controllers/customcar.js'

const router = express.Router()

router.get('/', getCustomCars)
router.get('/:custId', getCustomCarById)
router.post('/create', createCustomCar)
router.delete('/delete/:custId', deleteCustomCar)
router.patch('/edit/:custId', updateCustomCar)

export default router