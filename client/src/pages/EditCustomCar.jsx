import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OptionsCard from '../components/OptionsCard'
import '../App.css'
import { fetchExteriorOptions, fetchRoofOptions, fetchWheelOptions, fetchInteriorOptions } from '../utilities/CarOptions'
import { calcTotalPrice, canCombineOptions, changeIconColors, resetIconColors } from '../utilities/ValidateOptions'
import Modal from 'react-modal'

const EditCustomCar = ({data, exteriorOptions, roofOptions, wheelOptions, interiorOptions}) => {

    const [modalIsOpen, setIsOpen] = React.useState(false)

    function openModal() {
        setIsOpen(true)
    }
    
    function closeModal() {
        setIsOpen(false)
    }

    const {carId} = useParams()
    const [customCar, setCustomCar] = useState({id: carId, name: 'my new car', exterior_id: 1, roof_id: 32, wheels_id: 24, interior_id: 11, isconvertible: false})
    
    useEffect(() => {
        const fetchCar = async () => {
            const results = await fetch('https://boltbucketapi.up.railway.app/customcars/' + carId)
            const carData = await results.json()
            setCustomCar(carData)
        }

        fetchCar()
    }, [data, carId])

    useEffect(() => {
        getPrice()
    }, [customCar, customCar.total_price])

    const [exterior, setExterior] = useState([])
    useEffect(() => {
        const fetchExterior = async () => {
            const exteriorData = await fetchExteriorOptions(customCar.exterior_id)
            setExterior(exteriorData)
        }

        fetchExterior()
    }, [exterior, carId])

    const [roof, setRoof] = useState([])
    useEffect(() => {
        const fetchRoof = async () => {
            const roofData = await fetchRoofOptions(customCar.roof_id)
            setRoof(roofData)
        }

        fetchRoof()
    }, [roof, carId])

    const [wheels, setWheels] = useState([])
    useEffect(() => {
        const fetchWheels = async () => {
            const wheelsData = await fetchWheelOptions(customCar.wheels_id)
            setWheels(wheelsData)
        }

        fetchWheels()
    }, [wheels, carId])

    const [interior, setInterior] = useState([])
    useEffect(() => {
        const fetchInterior = async () => {
            const interiorData = await fetchInteriorOptions(customCar.interior_id)
            setInterior(interiorData)
        }

        fetchInterior()
    }, [interior, carId])

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
        customCar.roof_id = 32
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

    const updateCustomCar = async (event) => {
        event.preventDefault()
    
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customCar)
        }

        await fetch('https://boltbucketapi.up.railway.app/customcars/edit/' + customCar.id, options)

        window.location = '/customcars'
    }

    return (
        <div id='custom-car' className='CustomCar'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Invalid"
                className="invalid-modal"
                overlayClassName="overlay"
                appElement={document.getElementById('car-options')}
            >
                <h2>⚠️ NOPE!</h2>
                <p>Sorry, you can't put that roof on a {customCar.isconvertible ? 'convertible' : 'coupe'} 😔</p>
                <p>Please choose another option <em>or</em><br />{customCar.isconvertible ? 'uncheck' : 'check'} <strong>Convertible</strong> to switch {customCar.isconvertible ? 'back to a coupe' : 'to a convertible'}.</p>
                <button onClick={closeModal} className="modal-button">Ugh, ok fine 🙄</button>
            </Modal>

            <h2>{customCar.name}</h2>
            <p className='price'>💰 ${customCar.total_price} 💰</p>

            <div className='single-car-details'>
                <h3>Exterior</h3>
                <h3>Roof</h3>
                <h3>Wheels</h3>
                <h3>Interior</h3>

                <p>{exterior.color} -- 💵 ${exterior.price}</p>
                <p>{roof.color} -- 💵 ${roof.price}</p>
                <p>{wheels.color} -- 💵 ${wheels.price}</p>
                <p>{interior.color} -- 💵 ${interior.price}</p>

                <img src={exterior.image} />
                <img src={roof.image} />
                <img src={wheels.image} />
                <img src={interior.image} />
            </div>

            <details>
                <summary>Choose New Exterior</summary>
                <OptionsCard data={exteriorOptions} optionName={'exterior_id'} handleChange={handleChange} />
            </details>

            <details>
                <summary>Choose New Roof</summary>
                <OptionsCard data={roofOptions} optionName={'roof_id'} handleChange={handleChange} />
            </details>

            <details>
                <summary>Choose New Wheels</summary>
                <OptionsCard data={wheelOptions} optionName={'wheels_id'} handleChange={handleChange} />
            </details>

            <details>
                <summary>Choose New Interior</summary>
                <OptionsCard data={interiorOptions} optionName={'interior_id'} handleChange={handleChange} />
            </details>

            <div className="single-car-buttons">
                <input type='submit' value={'Update ' + customCar.name} onClick={updateCustomCar} />
            </div>
        </div>
    )
}

export default EditCustomCar