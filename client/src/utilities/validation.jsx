import ExteriorAPI from '../services/ExteriorAPI'
import RoofAPI from '../services/RoofAPI'
import WheelsAPI from '../services/WheelsAPI'
import InteriorAPI from '../services/InteriorAPI'

const canCombineOptions = async (car, roofId) => {

    const roofChoice = await RoofAPI.getRoof(roofId)

    if (car.isconvertible && roofChoice.isconvertible) {
        return true
    }
    else if (!car.isconvertible && !roofChoice.isconvertible) {
        return true
    }
    else {
        return false
    }
}

const setOptionColor = (option, id) => {
    resetOptionColors(option)
    const optionElement = document.getElementById(option + id)
    optionElement.style.border = '3px solid green'
}

const resetOptionColors = (option) => {
    let optionElements

    if (option === 'exterior') {
        optionElements = document.querySelectorAll('[id^="exterior"]')
    }
    else if (option === 'roof') {
        optionElements = document.querySelectorAll('[id^="roof"]')
    }
    else if (option === 'wheels') {
        optionElements = document.querySelectorAll('[id^="wheels"]')
    }
    else if (option === 'interior') {
        optionElements = document.querySelectorAll('[id^="interior"]')
    }

    optionElements.forEach((element) => {
        element.style.border = '1px solid white'
    })
}

const calcTotalPrice = (car, exterior, roof, wheels, interior) => {
    const base = getBasePrice(car)
    return Number(base) + Number(exterior) + Number(roof) + Number(wheels) + Number(interior)
}

const calcNewPrice = async (car) => {
    const base = getBasePrice(car)
    const exteriorPrice = await getExteriorPrice(car.exterior)
    const roofPrice = await getRoofPrice(car.roof)
    const wheelsPrice = await getWheelsPrice(car.wheels)
    const interiorPrice = await getInteriorPrice(car.interior)

    return Number(base) + Number(exteriorPrice) + Number(roofPrice) + Number(wheelsPrice) + Number(interiorPrice)
}

const getBasePrice = (car) => {
    if (car.isconvertible) {
        return 75000
    }
    else {
        return 65000
    }
}

const getExteriorPrice = async (id) => {
    if (id !== 0) {
        const exteriorChoice = await ExteriorAPI.getExterior(id)
        return exteriorChoice.price
    }
    else {
        return 0
    }
}

const getRoofPrice = async (id) => {
    if (id !== 0) {
        const roofChoice = await RoofAPI.getRoof(id)
        return roofChoice.price
    }
    else {
        return 0
    }
}

const getWheelsPrice = async (id) => {
    if (id !== 0) {
        const wheelsChoice = await WheelsAPI.getWheels(id)
        return wheelsChoice.price
    }
    else {
        return 0
    }
}

const getInteriorPrice = async (id) => {
    if (id !== 0) {
        const interiorChoice = await InteriorAPI.getInterior(id)
        return interiorChoice.price
    }
    else {
        return 0
    }
}

export default {
    canCombineOptions,
    setOptionColor,
    resetOptionColors,
    calcTotalPrice,
    calcNewPrice
}