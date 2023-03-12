import React, { useState } from 'react'
import '../App.css'

const OptionsCard = ({data, optionName, handleChange}) => {

    return (
        <div className="options-list">
            {
                data && data.length > 0 ?
                data.map((option, index) =>
                <div className="OptionsCard" style={{ backgroundImage: `url(${option.image})`}} key={option.id}>
                    <p>{option.color}</p>
                    <p>{option.price}</p>
                    <button onClick={handleChange(option.price)} name={optionName} value={option.id}><i className="fa-solid fa-circle-plus"></i></button>
                </div>
                ) : <p>{'No options available'}</p>
            }
        </div>
    )
}

export default OptionsCard