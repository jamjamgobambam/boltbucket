import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'

const CustomCar = ({data}) => {

    const {id} = useParams()
    const [customCar, setCustomCar] = useState({id: 0, name: '', exterior_id: 0, roof_id: 0, wheels_id: 0, interior_id: 0})

    useEffect(() => {
        const result = data.filter(item => item.id === parseInt(id))
        console.log(JSON.stringify(result))
        setCustomCar({id: result.id, name: result.name, exterior_id: result.exterior_id, roof_id: result.roof_id, wheels_id: result.wheels_id, interior_id: result.interior_id})
    }, [data, id])

    const [exterior, setExterior] = useState([])
    const [roof, setRoof] = useState([])
    const [wheels, setWheels] = useState([])
    const [interior, setInterior] = useState([])

    // useEffect(() => {
    //     fetch('https://boltbucketapi.up.railway.app/customcars/' + id)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setCustomCar(data)
    //             console.log(customCar)

    //             const fetchOptions = async () => {
    //                 const exteriorResponse = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + customCar.exterior_id)
    //                 const exteriorData = await exteriorResponse.json()
    //                 setExterior(exteriorData)

    //                 const roofResponse = await fetch('https://boltbucketapi.up.railway.app/roofs/' + customCar.roof_id)
    //                 const roofData = await roofResponse.json()
    //                 setRoof(roofData)

    //                 const wheelResponse = await fetch('https://boltbucketapi.up.railway.app/wheels/' + customCar.wheels_id)
    //                 const wheelData = await wheelResponse.json()
    //                 setWheels(wheelData)

    //                 const interiorResponse = await fetch('https://boltbucketapi.up.railway.app/interiors/' + customCar.interior_id)
    //                 const interiorData = await interiorResponse.json()
    //                 setInterior(interiorData)
    //             }

    //             fetchOptions()
    //         })
    // }, [])

    

    

    // useEffect(() => {
    //     const fetchExteriorOptions = async () => {
    //         const response = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + customCar.exterior_id)
    //         const exteriorData = await response.json()
    //         setExterior(exteriorData)
    //     }

    //     const fetchRoofOptions = async () => {
    //         const response = await fetch('https://boltbucketapi.up.railway.app/roofs/' + customCar.roof_id)
    //         const roofData = await response.json()
    //         setRoof(roofData)
    //     }

    //     const fetchWheelOptions = async () => {
    //         const response = await fetch('https://boltbucketapi.up.railway.app/wheels/' + customCar.wheels_id)
    //         const wheelData = await response.json()
    //         setWheels(wheelData)
    //     }

    //     const fetchInteriorOptions = async () => {
    //         const response = await fetch('https://boltbucketapi.up.railway.app/interiors/' + customCar.interior_id)
    //         const interiorData = await response.json()
    //         setInterior(interiorData)
    //     }

    //     fetchExteriorOptions()
    //     fetchRoofOptions()
    //     fetchWheelOptions()
    //     fetchInteriorOptions()
    // }, [])

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