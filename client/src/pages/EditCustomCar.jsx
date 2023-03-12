import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

const EditCustomCar = ({exterior, roof, wheels, interior}) => {

    const {id} = useParams()
    const [customCar, setCustomCar] = useState([])

    const [exteriorChoice, setExteriorChoice] = useState([])
    const [roofChoice, setRoofChoice] = useState([])
    const [wheelsChoice, setWheelsChoice] = useState([])
    const [interiorChoice, setInteriorChoice] = useState([])

    useEffect(() => {
        const getCustomCar = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/customcars/' + id)
            const result = await response.json()
            setCustomCar(result)
            console.log(id)

            // const fetchExteriorOptions = async () => {
            //     const response = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + customCar.exterior_id)
            //     const exteriorData = await response.json()
            //     setExteriorChoice(exteriorData)
            // }
    
            // const fetchRoofOptions = async () => {
            //     const response = await fetch('https://boltbucketapi.up.railway.app/roofs/' + customCar.roof_id)
            //     const roofData = await response.json()
            //     setRoofChoice(roofData)
            // }
    
            // const fetchWheelOptions = async () => {
            //     const response = await fetch('https://boltbucketapi.up.railway.app/wheels/' + customCar.wheels_id)
            //     const wheelData = await response.json()
            //     setWheelsChoice(wheelData)
            // }
    
            // const fetchInteriorOptions = async () => {
            //     const response = await fetch('https://boltbucketapi.up.railway.app/interiors/' + customCar.interior_id)
            //     const interiorData = await response.json()
            //     setInteriorChoice(interiorData)
            // }

            // fetchExteriorOptions()
            // fetchRoofOptions()
            // fetchWheelOptions()
            // fetchInteriorOptions()
        }

        getCustomCar()
    }, [])

    const handleChange = (event) => {
        const {name, value} = event.target
        setCustomCar((prev) => {
            return {
            ...prev,
            [name]:value
            }
        })
    }

    const updateCustomCar = async (event) => {
        event.preventDefault()
    
        
    }

    return (
        <div className="EditCustomCar">
            <h2>{customCar.name}</h2>
            
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
                        <button onClick={handleChange} name='exterior_id' value={exterior.id}><i className="fa-solid fa-circle-plus"></i></button>
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
                        <button onClick={handleChange} name='roof_id' value={roof.id}><i className="fa-solid fa-circle-plus"></i></button>
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
                        <button onClick={handleChange} name='wheels_id' value={wheels.id}><i className="fa-solid fa-circle-plus"></i></button>
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
                        <button onClick={handleChange} name='interior_id' value={interior.id}><i className="fa-solid fa-circle-plus"></i></button>
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