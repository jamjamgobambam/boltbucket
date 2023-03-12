import React, { useState, useEffect } from 'react'
import '../App.css'

const Car = (props) => {

    const [exterior, setExterior] = useState([])
    const [roof, setRoof] = useState([])
    const [wheels, setWheels] = useState([])
    const [interior, setInterior] = useState([])

    useEffect(() => {
        const fetchExteriorOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + props.exterior)
            const json = await response.json()
            setExterior(json)
            return json
        }

        const fetchRoofOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/roofs/' + props.roof)
            const roofData = await response.json()
            setRoof(roofData)
            return roofData
        }

        const fetchWheelOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/wheels/' + props.wheels)
            const wheelData = await response.json()
            setWheels(wheelData)
            return wheelData
        }

        const fetchInteriorOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/interiors/' + props.interior)
            const interiorData = await response.json()
            setInterior(interiorData)
            return interiorData
        }

        fetchExteriorOptions()
        fetchRoofOptions()
        fetchWheelOptions()
        fetchInteriorOptions()
    }, [])

    return (
        <div className="Car">
            <p>{props.name}</p>
            <p>{exterior.color}</p>
            <img src={exterior.image} />

            <p>{roof.color}</p>
            <img src={roof.image} />

            <p>{wheels.color}</p>
            <img src={wheels.image} />

            <p>{interior.color}</p>
            <img src={interior.image} />
        </div>
    )
}

export default Car