import React, { useState } from 'react'
import OptionsCard from '../components/OptionsCard'
import '../App.css'
import { calcTotalPrice, canCombineOptions, changeIconColors, resetIconColors } from '../utilities/ValidateOptions'
import Modal from 'react-modal'

const Options = ({exterior, roof, wheels, interior}) => {

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
      setIsOpen(true)
  }
  
  function closeModal() {
      setIsOpen(false)
  }

  const [customCar, setCustomCar] = useState({id: 1, name: 'my new car', exterior_id: 0, roof_id: 0, wheels_id: 0, interior_id: 0, isconvertible: false})

  const handleConvertible = async (event) => {
    const status = document.getElementById('isConvertible').checked
    customCar.isconvertible = status

    if (customCar.roof_id !== 0) {
      const result = await canCombineOptions(customCar, customCar.roof_id)
      if (!result) {
        setInvalidRoofCombo('roof_id', customCar.roof_id)
      }
    }
  }

  const handleChange = (carOption, optionId) => (event) => {
    getComboResult(carOption, optionId)
    getPrice()
  }

  const getComboResult = async (carOption, optionId) => {
    if (carOption === 'roof_id') {
      const result = await canCombineOptions(customCar, optionId)

      if (!result) {
        setInvalidRoofCombo(carOption, optionId)
      }
      else {
        setCarOption(carOption, optionId)
      }
    }
    else {
      setCarOption(carOption, optionId)
    }
  }

  const setInvalidRoofCombo = (carOption, optionId) => {
    changeIconColors(carOption, carOption + optionId, false)
    openModal()
    resetIconColors(carOption)
    customCar.roof_id = 0
  }

  const setCarOption = (carOption, optionId) => {
    changeIconColors(carOption, carOption + optionId, true)
    setCustomCar((prev) => {
      return {
        ...prev,
        [carOption]:optionId
      }
    })
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
        <input type='checkbox' id='isConvertible' onChange={handleConvertible} />
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