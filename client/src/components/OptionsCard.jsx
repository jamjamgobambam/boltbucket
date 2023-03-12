import React, { useState } from 'react'
import '../App.css'

const OptionsCard = (props, {handleChange}) => {

    return (
        <div className="OptionsCard" style={{ backgroundImage: `url(${props.image})`}}>
            <p>{props.color}</p>
            <p>{props.price}</p>
            <button onClick={handleChange}><i className="fa-solid fa-circle-plus"></i></button>
        </div>
    )
}

export default OptionsCard