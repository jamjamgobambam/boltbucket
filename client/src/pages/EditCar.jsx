import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../components/Navigation'
import CarsAPI from '../services/CarsAPI'
import carData from '../utilities/carData'
import OptionsList from '../components/OptionsList'
import Modal from 'react-modal'
import validation from '../utilities/validation'
import convertible from '../assets/convertible.png'
import coupe from '../assets/coupe.png'
import '../App.css'
import '../css/CarDetails.css'
import '../css/EditCar.css'
import '../css/InvalidModal.css'

const EditCar = (props) => {
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

    const { id } = useParams()
    const [car, setCar] = useState({id: 1, isconvertible: false, name: '', exterior: 1, roof: 1, wheels: 1, interior: 1})
    const [carExterior, setCarExterior] = useState([])
    const [carRoof, setCarRoof] = useState([])
    const [carWheels, setCarWheels] = useState([])
    const [carInterior, setCarInterior] = useState([])

    useEffect(() => {
        const fetchCar = async () => {
            const results = await carData.getCar(id)
            setCar(results)
        }

        fetchCar()
    }, [])

    useEffect(() => {
        const fetchExterior = async () => {
            const results = await carData.getCarExterior(car.exterior)
            setCarExterior(results)
            updatePrice()
        }

        fetchExterior()
    }, [carExterior, carExterior.id])

    useEffect(() => {
        const fetchRoof = async () => {
            const results = await carData.getCarRoof(car.roof)
            setCarRoof(results)
            updatePrice()
        }
        
        fetchRoof()
    }, [carRoof, carRoof.id])

    useEffect(() => {
        const fetchWheels = async () => {
            const results = await carData.getCarWheels(car.wheels)
            setCarWheels(results)
            updatePrice()
        }
        
        fetchWheels()
    }, [carWheels, carWheels.id])

    useEffect(() => {
        const fetchInterior = async () => {
            const results = await carData.getCarInterior(car.interior)
            setCarInterior(results)
            updatePrice()
        }
        
        fetchInterior()
    }, [carInterior, carInterior.id])

    const handleChange = (option, id) => (event) => {
        event.preventDefault()
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
        car[option] = id
    }

    const setInvalidOption = (option, id) => {
        validation.setOptionColor(option, id)
        openModal()
        validation.resetOptionColors(option)
        car.roof = 4
    }

    const updatePrice = () => {
        const totalPrice = validation.calcTotalPrice(car, carExterior.price, carRoof.price, carWheels.price, carInterior.price)
        car.price = totalPrice
    }

    const updateCar = async (event) => {
        event.preventDefault()
        await CarsAPI.updateCar(car)
        window.location = '/customcars'
    }

    const deleteCar = async (event) => {
        event.preventDefault()
        await CarsAPI.deleteCar(props)
        window.location = '/customcars'
    }
    
    return (
        <article className='car-full-details'>
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

            <header>
                <h2>{car.isconvertible ? <img src={convertible} /> : <img src={coupe} />}  {car.name}</h2>

                <div className='create-car-options'>
                    <OptionsList car={car} handleChange={handleChange} />
                </div>
            </header>

            <div className='details-content'>
                <div className='car-details-price'>
                    <p>💰 ${car.price}</p>
                </div>

                <div className='car-selection' style={{backgroundImage: `url(${carExterior.image})`}}>
                    <div className='car-selection-overlay'>
                        <div className='car-selection-details'>
                            <p><strong>🖌️ Exterior:</strong> {carExterior.color}</p>
                            <p className='option-price'>💵 ${carExterior.price}</p>
                        </div>
                    </div>
                </div>

                <div className='car-selection' style={{backgroundImage: `url(${carRoof.image})`}}>
                    <div className='car-selection-overlay'>
                        <div className='car-selection-details'>
                            <p><strong>😎 Roof:</strong> {carRoof.color}</p>
                            <p className='option-price'>💵 ${carRoof.price}</p>
                        </div>
                    </div>
                </div>

                <div className='car-modify'>
                    <input type='submit' value='Update' onClick={updateCar} />
                    <button onClick={deleteCar}>Delete</button>
                </div>

                <div className='car-selection' style={{backgroundImage: `url(${carWheels.image})`}}>
                    <div className='car-selection-overlay'>
                        <div className='car-selection-details'>
                            <p><strong>🛴 Wheels:</strong> {carWheels.color}</p>
                            <p className='option-price'>💵 ${carWheels.price}</p>
                        </div>
                    </div>
                </div>

                <div className='car-selection' style={{backgroundImage: `url(${carInterior.image})`}}>
                    <div className='car-selection-overlay'>
                        <div className='car-selection-details'>
                            <p><strong>💺 Interior:</strong> {carInterior.color}</p>
                            <p className='option-price'>💵 ${carInterior.price}</p>
                        </div>
                    </div>
                </div>

            </div>
        </article>
    )
}

export default EditCar