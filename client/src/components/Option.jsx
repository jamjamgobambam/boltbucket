import React, { useState } from 'react'
import Modal from 'react-modal'
import '../App.css'
import '../css/OptionModal.css'

const Option = ({option, data, handleChange}) => {

    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (

        <div id='car-options'>

            <button onClick={openModal}>{option}</button>

            <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel='Customize Car Option'
                    className='option-modal'
                    overlayClassName='modal-overlay'
                    appElement={document.getElementById('car-options')}
                >

                    <div className='available-options'>
                        {
                            data && data.length > 0 ?
                            data.map((item, index) =>
                            
                                    <div key={option + item.id} id={option + item.id} style={{backgroundImage: `url(${item.image})`}} className='option-card' onClick={handleChange(option, item.id)}>
                                        <div className='option-card-overlay'>
                                            <div id={item.id} className='option-card-details'>
                                                <p>{item.color} <br /> 💵 ${item.price}</p>
                                                <p>{item.isconvertible && option === 'roof' ? 'convertible only' : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : <h2>{'No options available!'}</h2>
                        }
                    </div>
                    
                <button onClick={closeModal}>Done</button>
            </Modal>
        </div>
    )
}

export default Option