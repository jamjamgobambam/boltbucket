import React, { useState } from 'react'
import OptionsCard from '../components/OptionsCard'
import '../App.css'
import { calcTotalPrice, canCombineOptions, changeIconColors, resetIconColors } from '../utilities/CarOptions'
import Modal from 'react-modal'

const Options = ({exterior, roof, wheels, interior}) => {

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
      setIsOpen(true)
  }
  
  function closeModal() {
      setIsOpen(false)
  }

  const [customCar, setCustomCar] = useState({id: 1, name: 'my new car', exterior_id: 1, roof_id: 32, wheels_id: 24, interior_id: 11, isconvertible: "false"})

  const handleChange = (carOption, optionId) => (event) => {
    getComboResult(carOption, optionId)
    getPrice()
  }

  const getComboResult = async (carOption, optionId) => {
    if (carOption === 'roof_id') {
      const result = await canCombineOptions(customCar, optionId)

      if (!result) {
        changeIconColors(carOption, carOption + optionId, false)
        openModal()
        resetIconColors(carOption)
      }
      else {
        changeIconColors(carOption, carOption + optionId, true)
        setCustomCar((prev) => {
            return {
            ...prev,
            [carOption]:optionId
            }
        })
      }
    }
    else {
      changeIconColors(carOption, carOption + optionId, true)
      setCustomCar((prev) => {
          return {
          ...prev,
          [carOption]:optionId
          }
      })
    }
  }

  const handleConvertible = (event) => {
    if (document.getElementById('isconvertible').checked) {
      setCustomCar((prev) => {
          return {
          ...prev,
          isconvertible:"true",
          }
      })
    }
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
    <div id='car-options' className="Options">
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Invalid"
          className="invalid-modal"
          overlayClassName="overlay"
          appElement={document.getElementById('car-options')}
      >
          <h2>⚠️ NOPE!</h2>
          <p>Sorry, you can't put that roof on a convertible 😔</p>
          <p>Please choose another option <em>or</em><br />uncheck <strong>Convertible</strong> to switch back to a coupe.</p>
          <button onClick={closeModal} className="modal-button">Ugh, ok fine 🙄</button>
      </Modal>

      <label>
        <input type='checkbox' id='isconvertible' name='isconvertible' value='true' onChange={handleConvertible} />
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