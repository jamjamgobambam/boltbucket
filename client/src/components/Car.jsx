import React from 'react'
import '../App.css'

const Car = (props) => {

    return (
        <div className="Car">
            <p>{props.name}</p>
        </div>
    )
}

export default Car