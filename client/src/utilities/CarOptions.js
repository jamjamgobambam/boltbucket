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