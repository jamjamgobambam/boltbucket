import React, { useState } from 'react'
import OptionsCard from '../components/OptionsCard'
import '../App.css'
import { calcTotalPrice } from '../utilities/CarOptions'

const Options = ({exterior, roof, wheels, interior}) => {

  const [customCar, setCustomCar] = useState({id: 1, name: 'my new car', exterior_id: 1, roof_id: 32, wheels_id: 24, interior_id: 11, isconvertible: false})

  const handleChange = (carOption, optionId) => (event) => {
    document.getElementById(carOption + optionId).style.color = 'green'

    setCustomCar((prev) => {
        return {
        ...prev,
        [carOption]:optionId
        }
    })

    getPrice()
  }

  const getPrice = async () => {
    const newPrice = await calcTotalPrice(customCar)
    
    setCustomCar((prev) => {
      return {
        ...prev,
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

    if (document.getElementById('isconvertible').checked) {
      setCustomCar((prev) => {
          return {
          ...prev,
          isconvertible:true,
          }
      })
    }

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
      <label>
        <input type='checkbox' id='isconvertible' name='isconvertible' value='true' />
        Convertible
      </label>

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