import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

const CustomCar = ({data}) => {

    const {id} = useParams()
    const [custom, setCustom] = useState({id: 0, name: '', exterior_id: 0, roof_id: 0, wheels_id: 0, interior_id: 0})

    const [exterior, setExterior] = useState([])
    const [roof, setRoof] = useState([])
    const [wheels, setWheels] = useState([])
    const [interior, setInterior] = useState([])

    useEffect(() => {
        const result = data.filter(item => item.id === parseInt(id))
        setCustom({id: result.id, name: result.name, exterior_id: result.exterior_id, roof_id: result.roof_id, wheels_id: result.wheels_id, interior_id: result.interior_id})
        console.log(custom)

        const fetchExteriorOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + custom.exterior_id)
            const exteriorData = await response.json()
            setExterior(exteriorData)
            return exteriorData
        }

        const fetchRoofOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/roofs/' + custom.roof_id)
            const roofData = await response.json()
            setRoof(roofData)
            return roofData
        }

        const fetchWheelOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/wheels/' + custom.wheels_id)
            const wheelData = await response.json()
            setWheels(wheelData)
            return wheelData
        }

        const fetchInteriorOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/interiors/' + custom.interior_id)
            const interiorData = await response.json()
            setInterior(interiorData)
            return interiorData
        }

        fetchExteriorOptions()
        fetchRoofOptions()
        fetchWheelOptions()
        fetchInteriorOptions()
    }, [data, id])

    return (
        <div className="CustomCar">
            {/* <h2>{custom.name}</h2> */}
            
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
        </div>
    )
}

export default CustomCar