import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'

const CustomCar = ({data}) => {

    const {id} = useParams()
    const [customCar, setCustomCar] = useState({id: 0, name: '', exterior_id: 0, roof_id: 0, wheels_id: 0, interior_id: 0})

    const [exterior, setExterior] = useState([])
    const [roof, setRoof] = useState([])
    const [wheels, setWheels] = useState([])
    const [interior, setInterior] = useState([])

    useEffect(() => {
        const result = data.filter(item => item.id === parseInt(id))[0]

        if (result) {
            setCustomCar({id: result.id, name: result.name, exterior_id: result.exterior_id, roof_id: result.roof_id, wheels_id: result.wheels_id, interior_id: result.interior_id})
        }

        const fetchExteriorChoice = async () => {
            const exteriorResponse = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + customCar.exterior_id)
            const exteriorData = await exteriorResponse.json()
            setExterior(exteriorData)
        }

        const fetchRoofChoice = async () => {
            const roofResponse = await fetch('https://boltbucketapi.up.railway.app/roofs/' + customCar.roof_id)
            const roofData = await roofResponse.json()
            setRoof(roofData)
        }

        const fetchWheelsChoice = async () => {
            const wheelResponse = await fetch('https://boltbucketapi.up.railway.app/wheels/' + customCar.wheels_id)
            const wheelData = await wheelResponse.json()
            setWheels(wheelData)
        }

        const fetchInteriorChoice = async () => {
            const interiorResponse = await fetch('https://boltbucketapi.up.railway.app/interiors/' + customCar.interior_id)
            const interiorData = await interiorResponse.json()
            setInterior(interiorData)
        }

        if (customCar.id != 0) {
            fetchExteriorChoice()
            fetchRoofChoice()
            fetchWheelsChoice()
            fetchInteriorChoice()
        }
    }, [data, id])

    const deleteCustomCar = async (event) => {
        event.preventDefault()
        
        const options = {
            method: 'DELETE'
        }

        await fetch('https://boltbucketapi.up.railway.app/customcars/delete/' + customCar.id, options)

        window.location = '/customcars'
    }

    return (
        <div className="CustomCar">
            <h2>{customCar.name}</h2>
            
            <h3>Exterior</h3>
            <p>{exterior.color}</p>
            <img src={exterior.image} />

            <h3>Roof</h3>
            <p>{roof.color}</p>
            <img src={roof.image} />

            <h3>Wheels</h3>
            <p>{wheels.color}</p>
            <img src={wheels.image} />

            <h3>Interior</h3>
            <p>{interior.color}</p>
            <img src={interior.image} />

            <Link to={'/edit/' + customCar.id} role='button'>Edit</Link>
            <button onClick={deleteCustomCar}>Delete</button>
        </div>
    )
}

export default CustomCar