import React, { useState, useEffect } from 'react'
import CarsAPI from '../services/CarsAPI'
import Card from '../components/Card'
import '../App.css'
import '../css/ViewCars.css'

const ViewCars = ({title}) => {
    useEffect(() => {
        document.title = title || ''
    }, [title])

    const [cars, setCars] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const carsData = await CarsAPI.getAllCars()
                setCars(carsData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])
    
    return (
        <main>
            {
                cars && cars.length > 0 ? cars.map((car, index) =>
                    <Card
                        key={car.id}
                        id={car.id}
                        name={car.name}
                        isconvertible={car.isconvertible}
                        exterior={car.exterior}
                        roof={car.roof}
                        wheels={car.wheels}
                        interior={car.interior}
                        price={car.price}
                    />
                ) : <h2>{'No cars have been created yet 😔'}</h2>
            }
        </main>
    )
}

export default ViewCars