export async function fetchExteriorOptions(id) {
    const results = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + id)
    return await results.json()
}

export async function fetchRoofOptions(id) {
    const results = await fetch('https://boltbucketapi.up.railway.app/roofs/' + id)
    return await results.json()
}

export async function fetchWheelOptions(id) {
    const results = await fetch('https://boltbucketapi.up.railway.app/wheels/' + id)
    return await results.json()
}

export async function fetchInteriorOptions(id) {
    const results = await fetch('https://boltbucketapi.up.railway.app/interiors/' + id)
    return await results.json()
}

export async function calcTotalPrice(customCar) {
    const exterior = await fetchExteriorOptions(customCar.exterior_id)
    const roof = await fetchRoofOptions(customCar.roof_id)
    const wheels = await fetchWheelOptions(customCar.wheels_id)
    const interior = await fetchInteriorOptions(customCar.interior_id)

    let totalPrice = 0

    if (customCar.isconvertible) {
        totalPrice = 75000
    }
    else {
        totalPrice = 65000
    }

    return Number(totalPrice) + Number(exterior.price) + Number(roof.price) + Number(wheels.price) + Number(interior.price)
}

export async function canCombineOptions(customCar, id) {
    const roof = await fetchRoofOptions(id)

    if (customCar.isconvertible && !roof.iscoupe) {
        return true
    }
    else {
        return false
    }
}

export function changeIconColors(elementId, status) {
    const optionIcon = document.getElementById(elementId)

    if (status) {
        optionIcon.style.color = 'green'
    }
    else {
        optionIcon.style.color = 'red'
    }
}