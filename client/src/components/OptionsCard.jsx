import React from 'react'
import '../App.css'

const OptionsCard = (props) => {
    return (
        <div className="OptionsCard" style={{ backgroundImage: `url(${props.image})`}}>
            <p>{props.color}</p>
        </div>
    )
}

export default OptionsCard