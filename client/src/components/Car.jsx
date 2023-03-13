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
        <article>
            <header>
                <h3>{props.name}</h3>
            </header>

            <p className='price'>💰 ${props.price} 💰</p>

            <h4><i className="fa-solid fa-car-on"></i> OPTIONS</h4>

            <div className='car-details'>
                <p><strong>🖌️ Exterior:</strong> <br /> {exterior.color}</p>
                <p><strong>😎 Roof:</strong> <br /> {roof.color}</p>
                <p><strong>🛞 Wheels:</strong> <br /> {wheels.color}</p>
                <p><strong>💺 Interior:</strong> <br /> {interior.color}</p>
            </div>

            <div className='car-details-buttons'>
                <Link to={'/customcars/' + props.id} role='button'>Details</Link>
                <Link to={'/edit/' + props.id} role='button'>Edit</Link>
                <button onClick={deleteCustomCar}>Delete</button>
            </div>

        </article>
    )
}

export default Car