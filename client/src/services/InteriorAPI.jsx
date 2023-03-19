import { request } from '../utilities/api'

const interiorURL = '/api/interiors'

const getAllInterior = () => request('GET', interiorURL)
const getInterior = (id) => request('GET', `${interiorURL}/${id}`)

export default {
    getAllInterior,
    getInterior
}