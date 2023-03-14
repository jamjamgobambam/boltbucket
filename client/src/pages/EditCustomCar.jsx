import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OptionsCard from '../components/OptionsCard'
import '../App.css'

const EditCustomCar = ({data, exterior, roof, wheels, interior}) => {

    const {id} = useParams()
    const [customCar, setCustomCar] = useState({id: 0, name: '', exterior_id: 0, roof_id: 0, wheels_id: 0, interior_id: 0, total_price: 0})

    const [exteriorChoice, setExteriorChoice] = useState({})
    const [roofChoice, setRoofChoice] = useState({})
    const [wheelsChoice, setWheelsChoice] = useState({})
    const [interiorChoice, setInteriorChoice] = useState({})

    useEffect(() => {
        const result = data.filter(item => item.id === parseInt(id))[0]

        if (result) {
            setCustomCar({id: result.id, name: result.name, exterior_id: result.exterior_id, roof_id: result.roof_id, wheels_id: result.wheels_id, interior_id: result.interior_id, total_price: result.total_price})
        }

        const fetchExteriorChoice = async () => {
            const exteriorResponse = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + customCar.exterior_id)
            const exteriorData = await exteriorResponse.json()
            setExteriorChoice(exteriorData)
        }

        const fetchRoofChoice = async () => {
            const roofResponse = await fetch('https://boltbucketapi.up.railway.app/roofs/' + customCar.roof_id)
            const roofData = await roofResponse.json()
            setRoofChoice(roofData)
        }

        const fetchWheelsChoice = async () => {
            const wheelResponse = await fetch('https://boltbucketapi.up.railway.app/wheels/' + customCar.wheels_id)
            const wheelData = await wheelResponse.json()
            setWheelsChoice(wheelData)
        }

        const fetchInteriorChoice = async () => {
            const interiorResponse = await fetch('https://boltbucketapi.up.railway.app/interiors/' + customCar.interior_id)
            const interiorData = await interiorResponse.json()
            setInteriorChoice(interiorData)
        }

        if (customCar.id != 0) {
            fetchExteriorChoice()
            fetchRoofChoice()
            fetchWheelsChoice()
            fetchInteriorChoice()
        }
    }, [data, id])

    const handleChange = (elementId, input, value, price) => (event) => {
        document.getElementById(elementId).style.color = 'green'

        setCustomCar((prev) => {
            return {
            ...prev,
            [input]:value,
            }
        })

        updateCustomCarPrice()
    }

    const updateCustomCarPrice = () => {
        const totalPrice = Number(exteriorChoice.price) + Number(roofChoice.price) + Number(wheelsChoice.price) + Number(interiorChoice.price)

        setCustomCar((prev) => {
            return {
                ...prev,
                total_price:totalPrice
            }
        })
    }

    const updateCustomCar = async (event) => {
        event.preventDefault()
    
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customCar)
        }

        await fetch('https://boltbucketapi.up.railway.app/customcars/edit/' + customCar.id, options)

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

                <p>{exteriorChoice.color} -- 💵 ${exteriorChoice.price}</p>
                <p>{roofChoice.color} -- 💵 ${roofChoice.price}</p>
                <p>{wheelsChoice.color} -- 💵 ${wheelsChoice.price}</p>
                <p>{interiorChoice.color} -- 💵 ${interiorChoice.price}</p>

                <img src={exteriorChoice.image} />
                <img src={roofChoice.image} />
                <img src={wheelsChoice.image} />
                <img src={interiorChoice.image} />
            </div>

            <details>
                <summary>Choose New Exterior</summary>
                <OptionsCard data={exterior} optionName={'exterior_id'} handleChange={handleChange} />
            </details>

            <details>
                <summary>Choose New Roof</summary>
                <OptionsCard data={roof} optionName={'roof_id'} handleChange={handleChange} />
            </details>

            <details>
                <summary>Choose New Wheels</summary>
                <OptionsCard data={wheels} optionName={'wheels_id'} handleChange={handleChange} />
            </details>

            <details>
                <summary>Choose New Interior</summary>
                <OptionsCard data={interior} optionName={'interior_id'} handleChange={handleChange} />
            </details>

            <div className="single-car-buttons">
                <input type='submit' value={'Update ' + customCar.name} onClick={updateCustomCar} />
            </div>
        </div>
    )
}

export default EditCustomCar