import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const OptionsCard = ({data, optionName, handleChange}) => {

    const currentOption = optionName

    return (
        <div className="options-list">
            {
                data && data.length > 0 ?
                data.map((option, index) =>
                <div className="OptionsCard" style={{ backgroundImage: `url(${option.image})`}} key={option.id}>
                    <div className="options-name-and-selection">
                        <div id={currentOption + option.id} className="options-selection" onClick={handleChange(currentOption, option.id)} name={optionName} value={option.id}><i className="fa-solid fa-circle-plus"></i></div>
                        <p>{option.color} <br /> 💵 ${option.price}</p>
                    </div>
                </div>
                ) : <p>{'No options available'}</p>
            }
        </div>
    )
}

export default OptionsCard