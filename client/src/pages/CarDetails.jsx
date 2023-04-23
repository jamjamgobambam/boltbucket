import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import convertible from '../assets/convertible.png'
import coupe from '../assets/coupe.png'
import carData from '../utilities/carData'
import CarsAPI from '../services/CarsAPI'
import '../App.css'
import '../css/CarDetails.css'

const CarDetails = () => {

    const { id } = useParams()
    const [car, setCar] = useState({id: 1, isconvertible: false, name: '', exterior: 1, roof: 1, wheels: 1, interior: 1, price: 0})
    const [carExterior, setCarExterior] = useState({id: 1, color: '', image: '', price: 0})
    const [carRoof, setCarRoof] = useState({id: 1, color: '', image: '', price: 0, isconvertible: false})
    const [carWheels, setCarWheels] = useState({id: 1, color: '', image: '', price: 0})
    const [carInterior, setCarInterior] = useState({id: 1, color: '', image: '', price: 0, iscombo: false})

    useEffect(() => {
        (async () => {
            const results = await carData.getCar(id)
            setCar(results)
        }) ()
    }, [car, id])

    useEffect(() => {
        (async () => {
            const results = await carData.getCarExterior(car.exterior)
            setCarExterior(results)
        }) ()
    }, [car, id])

    useEffect(() => {
        (async () => {
            const results = await carData.getCarRoof(car.roof)
            setCarRoof(results)
        }) ()
    }, [car, id])

    useEffect(() => {
        (async () => {
            const results = await carData.getCarWheels(car.wheels)
            setCarWheels(results)
        }) ()
    }, [car, id])

    useEffect(() => {
        (async () => {
            const results = await carData.getCarInterior(car.interior)
            setCarInterior(results)
        }) ()
    }, [car, id])

    const deleteCar = async (event) => {
        event.preventDefault()
        await CarsAPI.deleteCar(id)
        window.location = '/customcars'
    }

    return (
        <article className='car-full-details'>
            <header>
                <h2>{car.isconvertible ? <img src={convertible} /> : <img src={coupe} />}  {car.name}</h2>
            </header>

            <div className='details-content'>
                <div className='car-details-price'>
                    <p>💰 ${car.price}</p>
                </div>

                <div className='car-selection' style={{backgroundImage: `url(${carExterior.image})`}}>
                    <div className='car-selection-overlay'>
                        <div className='car-selection-details'>
                            <p><strong>🖌️ Exterior:</strong> {carExterior.color}</p>
                            <p className='option-price'>💵 ${carExterior.price}</p>
                        </div>
                    </div>
                </div>

                <div className='car-selection' style={{backgroundImage: `url(${carRoof.image})`}}>
                    <div className='car-selection-overlay'>
                        <div className='car-selection-details'>
                            <p><strong>😎 Roof:</strong> {carRoof.color}</p>
                            <p className='option-price'>💵 ${carRoof.price}</p>
                        </div>
                    </div>
                </div>

                <div className='car-modify'>
                    <a href={'/edit/' + car.id} role='button'>Edit</a>
                    <button onClick={deleteCar}>Delete</button>
                </div>

                <div className='car-selection' style={{backgroundImage: `url(${carWheels.image})`}}>
                    <div className='car-selection-overlay'>
                        <div className='car-selection-details'>
                            <p><strong>🛴 Wheels:</strong> {carWheels.color}</p>
                            <p className='option-price'>💵 ${carWheels.price}</p>
                        </div>
                    </div>
                </div>

                <div className='car-selection' style={{backgroundImage: `url(${carInterior.image})`}}>
                    <div className='car-selection-overlay'>
                        <div className='car-selection-details'>
                            <p><strong>💺 Interior:</strong> {carInterior.color}</p>
                            <p className='option-price'>💵 ${carInterior.price}</p>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    )
}

export default CarDetails