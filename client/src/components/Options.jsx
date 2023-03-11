import React, { useState, useEffect } from 'react'
import '../App.css'

const Options = (exterior, wheels, roof, interior) => {

  const [exteriorOptions, setExteriorOptions] = useState([])
  // const [roofOptions, setRoofOptions] = useState([])
  // const [wheelsOptions, setWheelsOptions] = useState([])
  // const [interiorOptions, setInteriorOptions] = useState([])

  useEffect(() => {setExteriorOptions(exterior.data)}, [exterior])
  // useEffect(() => {setRoofOptions(roof.data)}, [roof])
  // useEffect(() => {setWheelsOptions(wheels.data)}, [wheels])
  // useEffect(() => {setInteriorOptions(interior.data)}, [interior])

  return (
    <div className="Options">
      <details>
        <summary>Exterior</summary>
        <p>options</p>
      </details>

      <details>
        <summary>Roof</summary>
        <p>options</p>
      </details>

      <details>
        <summary>Wheels</summary>
        <p>options</p>
      </details>

      <details>
        <summary>Interior</summary>
        <p>options</p>
      </details>
    </div>
  )
}

export default Options