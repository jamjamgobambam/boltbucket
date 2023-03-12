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
            const exteriorData = await response.json()
            setExterior(exteriorData)
            return exteriorData
        }

        const fetchRoofOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/roofs/' + props.roof)
            const json = await response.json()
            setRoof(json)
            return json
        }

        const fetchWheelOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/wheels/' + props.wheels)
            const json = await response.json()
            setWheels(json)
            return json
        }

        const fetchInteriorOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/interiors/' + props.interior)
            const json = await response.json()
            setInterior(json)
            return json
        }

        fetchExteriorOptions()
        fetchRoofOptions()
        fetchWheelOptions()
        fetchInteriorOptions()
    }, [])

    return (
        <div className="Car">
            <p>{props.name}</p>
            {/* <p>{props.exterior}</p> */}
            <p>{exterior.color}</p>
            <img src={exterior.image} />

            <p>{props.roof}</p>
            <p>{props.wheels}</p>
            <p>{props.interior}</p>
        </div>
    )
}

export default Car