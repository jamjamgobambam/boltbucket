import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ExteriorAPI from '../services/ExteriorAPI'
import RoofAPI from '../services/RoofAPI'
import WheelsAPI from '../services/WheelsAPI'
import InteriorAPI from '../services/InteriorAPI'
import convertible from '../assets/convertible.png'
import coupe from '../assets/coupe.png'
import '../App.css'
import '../css/Card.css'

const Car = (props) => {

    const [exterior, setExterior] = useState([])
    const [roof, setRoof] = useState([])
    const [wheels, setWheels] = useState([])
    const [interior, setInterior] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const exteriorData = await ExteriorAPI.getExterior(props.exterior)
                setExterior(exteriorData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const roofData = await RoofAPI.getRoof(props.roof)
                setRoof(roofData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const wheelsData = await WheelsAPI.getWheels(props.wheels)
                setWheels(wheelsData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const interiorData = await InteriorAPI.getInterior(props.interior)
                setInterior(interiorData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    return (
        <article>
            <header>
                <h3>{props.isconvertible ? <img src={convertible} /> : <img src={coupe} />}  {props.name}</h3>
            </header>

            <div className='car-card'>
                <div className='car-summary'>
                    <p><strong>🖌️ Exterior:</strong> {exterior.color}</p>
                    <p><strong>😎 Roof:</strong> {roof.color}</p>
                </div>

                <div className='car-summary'>
                    <p><strong>🛴 Wheels:</strong> {wheels.color}</p>
                    <p><strong>💺 Interior:</strong> {interior.color}</p>
                </div>

                <div className='car-price'>
                    <p>💰 ${props.price}</p>
                    <a href={'/customcars/' + props.id} role='button'>Details</a>
                </div>
            </div>
        </article>
    )
    
}

export default Car