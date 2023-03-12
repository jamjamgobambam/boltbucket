import React, { useState, useEffect } from 'react'
import '../App.css'
import Car from '../components/Car'

const ViewCustomCars = (props) => {

    const [customCars, setCustomCars] = useState([])

    useEffect(() => {
        setCustomCars(props.data)
        console.log(customCars)
    }, [props])

    return (
        <div className="ViewCustomCars">
            {
                customCars && customCars.length > 0 ?
                customCars.map((customCar, index) =>
                <Car
                    key={customCar.id}
                    id={customCar.id}
                    name={customCar.name}
                    exterior={customCar.exterior_id}
                    roof={customCar.roof_id}
                    wheels={customCar.wheels_id}
                    interior={customCar.interior_id}
                />
                ) : <p>{'No custom cars yet 😔'}</p>
            }
        </div>
    )
}

export default ViewCustomCars