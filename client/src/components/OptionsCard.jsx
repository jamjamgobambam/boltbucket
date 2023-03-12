import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

const OptionsCard = (props, {handleChange}) => {

    return (
        <div className="OptionsCard" style={{ backgroundImage: `url(${props.image})`}}>
            <p>{props.color}</p>
            <button onClick={handleChange}><i className="fa-solid fa-circle-plus"></i></button>
        </div>
    )
}

export default OptionsCard