import CarsAPI from '../services/CarsAPI'
import ExteriorAPI from '../services/ExteriorAPI'
import RoofAPI from '../services/RoofAPI'
import WheelsAPI from '../services/WheelsAPI'
import InteriorAPI from '../services/InteriorAPI'

const getCar = async (id) => {
    try {
        const carData = await CarsAPI.getCar(id)
        return carData
    }
    catch (error) {
        throw error
    }
}

const getCarExterior = async (exterior) => {
    try {
        const exteriorData = await ExteriorAPI.getExterior(exterior)
        return exteriorData
    }
    catch (error) {
        throw error
    }
}

const getCarRoof = async (roof) => {
    try {
        const roofData = await RoofAPI.getRoof(roof)
        return roofData
    }
    catch (error) {
        throw error
    }
}

const getCarWheels = async (wheels) => {
    try {
        const wheelsData = await WheelsAPI.getWheels(wheels)
        return wheelsData
    }
    catch (error) {
        throw error
    }
}

const getCarInterior = async (interior) => {
    try {
        const interiorData = await InteriorAPI.getInterior(interior)
        return interiorData
    }
    catch (error) {
        throw error
    }
}

export default {
    getCar,
    getCarExterior,
    getCarRoof,
    getCarWheels,
    getCarInterior
}