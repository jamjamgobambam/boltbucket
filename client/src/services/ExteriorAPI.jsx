import { request } from '../utilities/api'

const exteriorURL = '/api/exteriors'

const getAllExterior = () => request('GET', exteriorURL)
const getExterior = (id) => request('GET', `${exteriorURL}/${id}`)

export default {
    getAllExterior,
    getExterior
}