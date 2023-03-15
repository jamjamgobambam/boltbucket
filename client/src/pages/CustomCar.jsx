import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import { fetchExteriorOptions, fetchRoofOptions, fetchWheelOptions, fetchInteriorOptions } from '../utilities/CarOptions'

const CustomCar = ({data}) => {

    const {id} = useParams()
    const [customCar, setCustomCar] = useState({id: 1, name: 'my new car', exterior_id: 1, roof_id: 32, wheels_id: 24, interior_id: 11})

    useEffect(() => {
        const fetchCar = async () => {
            const result = await data.filter(item => item.id === parseInt(id))[0]
            setCustomCar({id: result.id, name: result.name, exterior_id: result.exterior_id, roof_id: result.roof_id, wheels_id: result.wheels_id, interior_id: result.interior_id, total_price: result.total_price})
        }

        fetchCar()
    }, [data, id])

    const [exterior, setExterior] = useState([])
    useEffect(() => {
        const fetchExterior = async () => {
            const exteriorData = await fetchExteriorOptions(customCar.exterior_id)
            setExterior(exteriorData)
        }

        fetchExterior()
    }, [exterior, id])

    const [roof, setRoof] = useState([])
    useEffect(() => {
        const fetchRoof = async () => {
            const roofData = await fetchRoofOptions(customCar.roof_id)
            setRoof(roofData)
        }

        fetchRoof()
    }, [roof, id])

    const [wheels, setWheels] = useState([])
    useEffect(() => {
        const fetchWheels = async () => {
            const wheelsData = await fetchWheelOptions(customCar.wheels_id)
            setWheels(wheelsData)
        }

        fetchWheels()
    }, [wheels, id])

    const [interior, setInterior] = useState([])
    useEffect(() => {
        const fetchInterior = async () => {
            const interiorData = await fetchInteriorOptions(customCar.interior_id)
            setInterior(interiorData)
        }

        fetchInterior()
    }, [interior, id])

    const deleteCustomCar = async (event) => {
        event.preventDefault()
        
        const options = {
            method: 'DELETE'
        }

        await fetch('https://boltbucketapi.up.railway.app/customcars/delete/' + customCar.id, options)

        window.location = '/customcars'
    }

    return (
        <div className='CustomCar'>
            <h2>{customCar.name}</h2>
            <p className='price'>💰 ${customCar.total_price} 💰</p>

            <div className='single-car-details'>
                <h3>Exterior</h3>
                <h3>Roof</h3>
                <h3>Wheels</h3>
                <h3>Interior</h3>

                <p>{exterior.color} <br /> 💵 ${exterior.price}</p>
                <p>{roof.color} <br /> 💵 ${roof.price}</p>
                <p>{wheels.color} <br /> 💵 ${wheels.price}</p>
                <p>{interior.color} <br /> 💵 ${interior.price}</p>

                <img src={exterior.image} />
                <img src={roof.image} />
                <img src={wheels.image} />
                <img src={interior.image} />
            </div>

            <div className='single-car-buttons'>
                <Link to={'/edit/' + customCar.id} role='button'>Edit</Link>
                <button onClick={deleteCustomCar}>Delete</button>
            </div>
        </div>
    )
}

export default CustomCar