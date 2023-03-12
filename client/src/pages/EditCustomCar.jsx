import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

const EditCustomCar = ({data, exterior, roof, wheels, interior}) => {

    const {id} = useParams()
    const [customCar, setCustomCar] = useState({id: 0, name: '', exterior_id: 0, roof_id: 0, wheels_id: 0, interior_id: 0, total_price: 0})

    const [exteriorChoice, setExteriorChoice] = useState([])
    const [roofChoice, setRoofChoice] = useState([])
    const [wheelsChoice, setWheelsChoice] = useState([])
    const [interiorChoice, setInteriorChoice] = useState([])

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

    const handleChange = (event) => {
        const {name, value, price} = event.target
        customCar.total_price += price

        setCustomCar((prev) => {
            return {
            ...prev,
            [name]:value
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
        <div className="EditCustomCar">
            <h2>{customCar.name}</h2>
            <p>{customCar.total_price}</p>
            
            <h3>Current Exterior</h3>
            <p>{exteriorChoice.color}</p>
            <img src={exteriorChoice.image} />

            <details>
            <summary>Change Exterior</summary>
            <div>
                {
                    exterior && exterior.length > 0 ?
                    exterior.map((exterior, index) =>
                    <div style={{ backgroundImage: `url(${exterior.image})`}} key={exterior.id}>
                        <p>{exterior.color}</p>
                        <button onClick={handleChange} name='exterior_id' value={exterior.id} price={exterior.price}><i className="fa-solid fa-circle-plus"></i></button>
                    </div>
                    ) : <p>{'No exterior options'}</p>
                }
                </div>
            </details>

            <h3>Current Roof</h3>
            <p>{roofChoice.color}</p>
            <img src={roofChoice.image} />

            <details>
            <summary>Change Roof</summary>
            <div className="options-list">
                {
                    roof && roof.length > 0 ?
                    roof.map((roof, index) =>
                    <div className="OptionsCard" style={{ backgroundImage: `url(${roof.image})`}} key={roof.id}>
                        <p>{roof.color}</p>
                        <button onClick={handleChange} name='roof_id' value={roof.id} price={roof.price}><i className="fa-solid fa-circle-plus"></i></button>
                    </div>
                    ) : <p>{'No roof options'}</p>
                }
                </div>
            </details>

            <h3>Current Wheels</h3>
            <p>{wheelsChoice.color}</p>
            <img src={wheelsChoice.image} />

            <details>
            <summary>Change Wheels</summary>
            <div className="options-list">
                {
                    wheels && wheels.length > 0 ?
                    wheels.map((wheels, index) =>
                    <div className="OptionsCard" style={{ backgroundImage: `url(${wheels.image})`}} key={wheels.id}>
                        <p>{wheels.color}</p>
                        <button onClick={handleChange} name='wheels_id' value={wheels.id} price={wheels.price}><i className="fa-solid fa-circle-plus"></i></button>
                    </div>
                    ) : <p>{'No wheels options'}</p>
                }
                </div>
            </details>

            <h3>Current Interior</h3>
            <p>{interiorChoice.color}</p>
            <img src={interiorChoice.image} />

            <details>
            <summary>Change Interior</summary>
            <div className="options-list">
                {
                    interior && interior.length > 0 ?
                    interior.map((interior, index) =>
                    <div className="OptionsCard" style={{ backgroundImage: `url(${interior.image})`}} key={interior.id}>
                        <p>{interior.color}</p>
                        <button onClick={handleChange} name='interior_id' value={interior.id} price={interior.price}><i className="fa-solid fa-circle-plus"></i></button>
                    </div>
                    ) : <p>{'No interior options'}</p>
                }
                </div>
            </details>

            <input type='submit' value={'Update ' + customCar.name} onClick={updateCustomCar} />
        </div>
    )
}

export default EditCustomCar