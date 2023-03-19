import { request } from '../utilities/api'

const roofsURL = '/api/roofs'

const getAllRoofs = () => request('GET', roofsURL)
const getRoof = (id) => request('GET', `${roofsURL}/${id}`)

export default {
    getAllRoofs,
    getRoof
}