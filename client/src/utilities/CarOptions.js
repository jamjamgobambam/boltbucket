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

    if (customCar.isconvertible && !(roof.iscoupe)) {
        return true
    }
    else {
        return false
    }
}

export function changeIconColors(optionName, elementId, status) {
    resetIconColors(optionName)

    const optionIcon = document.getElementById(elementId)

    if (status) {
        optionIcon.style.color = 'green'
    }
    else {
        optionIcon.style.color = 'red'
    }
}

export function resetIconColors(optionName) {
    let icons = ''

    if (optionName === 'exterior_id') {
        icons = document.querySelectorAll('[id^="exterior_id"]')
    }
    else if (optionName === 'roof_id') {
        icons = document.querySelectorAll('[id^="roof_id"]')
    }
    else if (optionName === 'wheels_id') {
        icons = document.querySelectorAll('[id^="wheels_id"]')
    }
    else if (optionName === 'interior_id') {
        icons = document.querySelectorAll('[id^="interior_id"]')
    }

    icons.forEach((icon) => {
        icon.style.color = 'white'
    })
}