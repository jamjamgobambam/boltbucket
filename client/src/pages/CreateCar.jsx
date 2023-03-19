import React, { useEffect, useState } from 'react'
import CarsAPI from '../services/CarsAPI'
import OptionsList from '../components/OptionsList'
import validation from '../utilities/validation'
import Modal from 'react-modal'
import '../App.css'
import '../css/CreateCar.css'
import '../css/InvalidModal.css'

const CreateCar = (props) => {
    useEffect(() => {
        document.title = props.title || ''
    }, [props.title])

    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const [car, setCar] = useState({id: 0, isconvertible: false, name: '', exterior: 0, roof: 0, wheels: 0, interior: 0, price: 0})

    useEffect(() => {
        updatePrice(car)
    }, [car, car.price])

    const handleConvertible = async (event) => {
        car.isconvertible = document.getElementById('isconvertible').checked
        
        if (car.roof != 0) {
            checkOption('roof', car.roof)
        }
    }

    const handleChange = (option, id) => (event) => {
        checkOption(option, id)
    }

    const checkOption = async (option, id) => {
        if (option === 'roof') {
            const result = await validation.canCombineOptions(car, id)

            if (result) {
                setOption(option, id)
            }
            else {
                setInvalidOption(option, id)
            }
        }
        else {
            setOption(option, id)
        }
    }

    const setOption = (option, id) => {
        validation.setOptionColor(option, id)

        setCar((prev) => {
            return {
                ...prev,
                [option]:id
            }
        })
    }

    const setInvalidOption = (option, id) => {
        validation.setOptionColor(option, id)
        openModal()
        validation.resetOptionColors(option)
        car.roof = 4
    }

    const handleName = (event) => {
        car.name = event.target.value
    }

    const updatePrice = async () => {
        const totalPrice = await validation.calcNewPrice(car)

        setCar((prev) => {
            return {
              ...prev,
              price:totalPrice
            }
        })
    }

    const submitCar = async (event) => {
        event.preventDefault()
        await CarsAPI.createCar(car)
        window.location = '/customcars'
    }

    return (
        <div className='create-car'>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Invalid Selection'
                className='invalid-modal'
                overlayClassName='modal-overlay'
                appElement={document.getElementById('car-options')}
            >

                <h2>⚠️ NOPE!</h2>
                <p>Sorry, you can't put that roof on a {car.isconvertible ? 'convertible' : 'coupe'} 😔</p>
                <p>Please choose another option <em>or</em><br />{car.isconvertible ? 'uncheck' : 'check'} <strong>Convertible</strong> to switch {car.isconvertible ? 'back to a coupe' : 'to a convertible'}.</p>
                
                <button onClick={closeModal}>Ugh, ok fine 🙄</button>
            </Modal>
            
            <label>
                <input type='checkbox' id='isconvertible' onChange={handleConvertible} />
                Convertible
            </label>

            <div className='create-car-options'>
                <OptionsList car={car} handleChange={handleChange} />
            </div>

            <div className='create-car-price'>
                💰${car.price}
            </div>

            <div className='create-car-name'>
                <input type='text' id='name' name='name' placeholder='My New Car' onChange={handleName} />
                <input type='submit' className='create-car-button' value='Create' onClick={submitCar} />
            </div>

        </div>
    )
}

export default CreateCar