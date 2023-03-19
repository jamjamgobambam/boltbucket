import React, { useState, useEffect } from 'react'
import ExteriorAPI from '../services/ExteriorAPI'
import RoofAPI from '../services/RoofAPI'
import WheelsAPI from '../services/WheelsAPI'
import InteriorAPI from '../services/InteriorAPI'
import Option from './Option'

const OptionsList = ({car, handleChange}) => {

    const [exteriors, setExteriors] = useState([])
    const [roofs, setRoofs] = useState([])
    const [wheels, setWheels] = useState([])
    const [interiors, setInteriors] = useState([])

    useEffect(() => {
        (async () => {
            const exteriorData = await ExteriorAPI.getAllExterior()
            setExteriors(exteriorData)

            const roofData = await RoofAPI.getAllRoofs()
            setRoofs(roofData)

            const wheelsData = await WheelsAPI.getAllWheels()
            setWheels(wheelsData)

            const interiorData = await InteriorAPI.getAllInterior()
            setInteriors(interiorData)
        }) ()
    }, [])

    return (
        <div id='customization-options' className='car-options'>
            <Option option ='exterior' car={car} data={exteriors} handleChange={handleChange} />

            <Option option='roof' car={car} data={roofs} handleChange={handleChange} />

            <Option option='wheels' car={car} data={wheels} handleChange={handleChange} />

            <Option option='interior' car={car} data={interiors} handleChange={handleChange} />
        </div>
    )
}

export default OptionsList