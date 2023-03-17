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