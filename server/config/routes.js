import express from 'express'

import CarsController from '../controllers/cars.js'
import ExteriorsController from '../controllers/exteriors.js'
import RoofsController from '../controllers/roofs.js'
import WheelsController from '../controllers/wheels.js'
import InteriorsController from '../controllers/interiors.js'

const router = express.Router()

// custom cars
router.get('/cars', CarsController.getCars)
router.get('/cars/:id', CarsController.getCarById)
router.post('/cars', CarsController.createCar)
router.patch('/cars/:id', CarsController.updateCar)
router.delete('/cars/:id', CarsController.deleteCar)

// exterior options
router.get('/exteriors', ExteriorsController.getExteriors)
router.get('/exteriors/:id', ExteriorsController.getExteriorsById)

// roof options
router.get('/roofs', RoofsController.getRoofs)
router.get('/roofs/:id', RoofsController.getRoofsById)

// wheels options
router.get('/wheels', WheelsController.getWheels)
router.get('/wheels/:id', WheelsController.getWheelsById)

// interior options
router.get('/interiors', InteriorsController.getInteriors)
router.get('/interiors/:id', InteriorsController.getInteriorsById)

export default router