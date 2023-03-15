import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import OptionsCard from '../components/OptionsCard'
import '../App.css'

const Options = ({exterior, roof, wheels, interior}) => {

  const [customCar, setCustomCar] = useState({name: '', exterior_id: 0, roof_id: 0, wheels_id: 0, interior_id: 0, total_price: 0})

  const handleChange = (price) => (event) => {
    const {name, value} = event.target
    const newPrice = Number(customCar.total_price) + Number(price)

    setCustomCar((prev) => {
        return {
        ...prev,
        [name]:value,
        total_price:newPrice
        }
    })
  }

  const handleName = (event) => {
    const {name, value} = event.target

    setCustomCar((prev) => {
        return {
        ...prev,
        [name]:value,
        }
    })
  }

  const createCustomCar = async (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customCar)
    }

    await fetch('https://boltbucketapi.up.railway.app/customcars/create', options)

    window.location = '/customcars'
  }

  return (
    <div className="Options">
      <details>
        <summary>Exterior</summary>
        <OptionsCard data={exterior} optionName={'exterior_id'} handleChange={handleChange} />
      </details>

      <details>
        <summary>Roof</summary>
        <OptionsCard data={roof} optionName={'roof_id'} handleChange={handleChange} />
      </details>

      <details>
        <summary>Wheels</summary>
        <OptionsCard data={wheels} optionName={'wheels_id'} handleChange={handleChange} />
      </details>

      <details>
        <summary>Interior</summary>
        <OptionsCard data={interior} optionName={'interior_id'} handleChange={handleChange} />
      </details>

      <input type='text' id='name' name='name' placeholder='My New Car' onChange={handleName} />

      <input type='submit' value='Create' onClick={createCustomCar} />
    </div>
  )
}

export default Options