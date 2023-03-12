import React, { useState, useEffect } from 'react'
import '../App.css'
import Car from '../components/Car'

const ViewCustomCars = (props) => {

    const [customCars, setCustomCars] = useState([])

    useEffect(() => {
        setCustomCars(props.data)
    }, [props])

    return (
        <div className="ViewCustomCars">
            {
                customCars && customCars.length > 0 ?
                customCars.map((customCar, index) =>
                <Car key={customCar.id} id={customCar.id} name={customCar.name} />
                ) : <p>{'No custom cards yet 😔'}</p>
            }
        </div>
    )
}

export default ViewCustomCars