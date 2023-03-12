import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

const Options = ({custom, exterior, roof, wheels, interior}) => {

  const [customCar, setCustomCar] = useState({name: 'new car', exterior_id: 0, roof_id: 0, wheels_id: 0, interior_id: 0, total_price: 0})

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
        <div className="options-list">
          {
            exterior && exterior.length > 0 ?
            exterior.map((exterior, index) =>
              <div className="OptionsCard" style={{ backgroundImage: `url(${exterior.image})`}} key={exterior.id}>
                <p>{exterior.color}</p>
                <p>{exterior.price}</p>
                <button onClick={handleChange} name='exterior_id' value={exterior.id} price={exterior.price}><i className="fa-solid fa-circle-plus"></i></button>
              </div>
            ) : <p>{'No exterior options'}</p>
          }
        </div>
      </details>

      <details>
        <summary>Roof</summary>
        <div className="options-list">
          {
            roof && roof.length > 0 ?
            roof.map((roof, index) =>
              <div className="OptionsCard" style={{ backgroundImage: `url(${roof.image})`}} key={roof.id}>
                <p>{roof.color}</p>
                <p>{roof.price}</p>
                <button onClick={handleChange} name='roof_id' value={roof.id} price={roof.price}><i className="fa-solid fa-circle-plus"></i></button>
              </div>
            ) : <p>{'No roof options'}</p>
          }
        </div>
      </details>

      <details>
        <summary>Wheels</summary>
        <div className="options-list">
          {
            wheels && wheels.length > 0 ?
            wheels.map((wheels, index) =>
              <div className="OptionsCard" style={{ backgroundImage: `url(${wheels.image})`}} key={wheels.id}>
                <p>{wheels.color}</p>
                <p>{wheels.price}</p>
                <button onClick={handleChange} name='wheels_id' value={wheels.id} price={wheels.price}><i className="fa-solid fa-circle-plus"></i></button>
              </div>
            ) : <p>{'No wheels options'}</p>
          }
        </div>
      </details>

      <details>
        <summary>Interior</summary>
        <div className="options-list">
          {
            interior && interior.length > 0 ?
            interior.map((interior, index) =>
              <div className="OptionsCard" style={{ backgroundImage: `url(${interior.image})`}} key={interior.id}>
                <p>{interior.color}</p>
                <p>{interior.price}</p>
                <button onClick={handleChange} name='interior_id' value={interior.id} price={interior.price}><i className="fa-solid fa-circle-plus"></i></button>
              </div>
            ) : <p>{'No interior options'}</p>
          }
        </div>
      </details>

      <input type='submit' value='Create Custom Car' onClick={createCustomCar} />
    </div>
  )
}

export default Options