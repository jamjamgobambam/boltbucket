import { request } from '../utilities/api'

const wheelsURL = '/api/wheels'

const getAllWheels = () => request('GET', wheelsURL)
const getWheels = (id) => request('GET', `${wheelsURL}/${id}`)

export default {
    getAllWheels,
    getWheels
}