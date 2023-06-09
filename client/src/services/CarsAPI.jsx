import { request } from '../utilities/api'

const carsURL = '/api/cars'

const getAllCars = () => request('GET', carsURL)
const getCar = (id) => request('GET', `${carsURL}/${id}`)
const createCar = (car) => request('POST', carsURL, car) 
const updateCar = (car) => request('PATCH', `${carsURL}/${car.id}`, car)
const deleteCar = (id) => request('DELETE', `${carsURL}/${id}`)

export default {
    getAllCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}