export async function fetchExteriorOptions(id) {
    if (id !== 0) {
        const results = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + id)
        return await results.json()
    }
}

export async function fetchRoofOptions(id) {
    if (id !== 0) {
        const results = await fetch('https://boltbucketapi.up.railway.app/roofs/' + id)
        return await results.json()
    }
}

export async function fetchWheelOptions(id) {
    if (id !== 0) {
        const results = await fetch('https://boltbucketapi.up.railway.app/wheels/' + id)
        return await results.json()
    }
}

export async function fetchInteriorOptions(id) {
    if (id !== 0) {
        const results = await fetch('https://boltbucketapi.up.railway.app/interiors/' + id)
        return await results.json()
    }
}

// export async function calcTotalPrice(customCar) {
//     let exteriorPrice = 0
//     let roofPrice = 0
//     let wheelsPrice = 0
//     let interiorPrice = 0
//     let totalPrice = 0

//     const exterior = await fetchExteriorOptions(customCar.exterior_id)
    
//     if (exterior) {
//         exteriorPrice = exterior.price
//     }

//     const roof = await fetchRoofOptions(customCar.roof_id)

//     if (roof) {
//         roofPrice = roof.price
//     }

//     const wheels = await fetchWheelOptions(customCar.wheels_id)

//     if (wheels) {
//         wheelsPrice = wheels.price
//     }

//     const interior = await fetchInteriorOptions(customCar.interior_id)

//     if (interior) {
//         interiorPrice = interior.price
//     }

//     if (customCar.isconvertible) {
//         totalPrice = 75000
//     }
//     else {
//         totalPrice = 65000
//     }

//     return totalPrice + exteriorPrice + roofPrice + wheelsPrice + interiorPrice
// }

// export async function canCombineOptions(customCar, id) {
//     const roof = await fetchRoofOptions(id)

//     if (customCar.isconvertible && roof.isconvertible) {
//         return true
//     }
//     else if (!customCar.isconvertible && !roof.isconvertible) {
//         return true
//     }
//     else {
//         return false
//     }
// }

// export function changeIconColors(optionName, elementId, status) {
//     resetIconColors(optionName)

//     const optionIcon = document.getElementById(elementId)

//     if (status) {
//         optionIcon.style.color = 'green'
//     }
//     else {
//         optionIcon.style.color = 'red'
//     }
// }

// export function resetIconColors(optionName) {
//     let icons = ''

//     if (optionName === 'exterior_id') {
//         icons = document.querySelectorAll('[id^="exterior_id"]')
//     }
//     else if (optionName === 'roof_id') {
//         icons = document.querySelectorAll('[id^="roof_id"]')
//     }
//     else if (optionName === 'wheels_id') {
//         icons = document.querySelectorAll('[id^="wheels_id"]')
//     }
//     else if (optionName === 'interior_id') {
//         icons = document.querySelectorAll('[id^="interior_id"]')
//     }

//     icons.forEach((icon) => {
//         icon.style.color = 'white'
//     })
// }