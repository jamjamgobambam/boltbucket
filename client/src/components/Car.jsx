import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
        }

        const fetchRoofOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/roofs/' + props.roof)
            const roofData = await response.json()
            setRoof(roofData)
        }

        const fetchWheelOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/wheels/' + props.wheels)
            const wheelData = await response.json()
            setWheels(wheelData)
        }

        const fetchInteriorOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/interiors/' + props.interior)
            const interiorData = await response.json()
            setInterior(interiorData)
        }

        fetchExteriorOptions()
        fetchRoofOptions()
        fetchWheelOptions()
        fetchInteriorOptions()
    }, [])

    const deleteCustomCar = async (event) => {
        event.preventDefault()
        
        const options = {
            method: 'DELETE'
        }

        await fetch('https://boltbucketapi.up.railway.app/customcars/delete/' + props.id, options)

        window.location = '/customcars'
    }

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

            <Link to={'/edit/' + props.id} role='button'>Edit</Link>
            <Link to={'/customcars/' + props.id} role='button'>View Details</Link>
            <button onClick={deleteCustomCar}>Delete</button>
        </div>
    )
}

export default Car