import React, { useState, useEffect } from 'react'
import '../App.css'

const Car = (props) => {

    const [exterior, setExterior] = useState([])

    useEffect(() => {
        const fetchExteriorOptions = async () => {
            const response = await fetch('https://boltbucketapi.up.railway.app/exteriors/' + props.exterior)
            const json = await response.json()
            setExterior(json)
            return json
        }

        console.log(exterior)
        fetchExteriorOptions()
    }, [])

    return (
        <div className="Car">
            <p>{props.name}</p>
            <p>{exterior.color}</p>
            <img src={exterior.image} />

            <p>{props.roof}</p>
            <p>{props.wheels}</p>
            <p>{props.interior}</p>
        </div>
    )
}

export default Car