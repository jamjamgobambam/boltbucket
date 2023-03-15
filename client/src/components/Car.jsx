import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { fetchExteriorOptions, fetchRoofOptions, fetchWheelOptions, fetchInteriorOptions } from '../utilities/CarOptions'

const Car = (props) => {

    const [exterior, setExterior] = useState([])
    useEffect(() => {
        const fetchExterior = async () => {
            const exteriorData = await fetchExteriorOptions(props.exterior)
            setExterior(exteriorData)
        }

        fetchExterior()
    }, [])

    const [roof, setRoof] = useState([])
    useEffect(() => {
        const fetchRoof = async () => {
            const roofData = await fetchRoofOptions(props.roof)
            setRoof(roofData)
        }

        fetchRoof()
    }, [])

    const [wheels, setWheels] = useState([])
    useEffect(() => {
        const fetchWheels = async () => {
            const wheelsData = await fetchWheelOptions(props.wheels)
            setWheels(wheelsData)
        }

        fetchWheels()
    }, [])

    const [interior, setInterior] = useState([])
    useEffect(() => {
        const fetchInterior = async () => {
            const interiorData = await fetchInteriorOptions(props.interior)
            setInterior(interiorData)
        }

        fetchInterior()
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
                <h3>{props.isconvertible ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-person-shelter"></i>}  {props.name}</h3>
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