import React, { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import './App.css'
import '~picocss/pico.min.css'
import Options from './pages/Options'
import ViewCustomCars from './pages/ViewCustomCars'
import CustomCar from './pages/CustomCar'
import EditCustomCar from './pages/EditCustomCar'

const App = () => {

  const [exterior, setExterior] = useState([])
  const [roof, setRoof] = useState([])
  const [wheels, setWheels] = useState([])
  const [interior, setInterior] = useState([])
  const [custom, setCustom] = useState([])

  useEffect(() => {
    const fetchExteriorOptions = async () => {
      const response = await fetch('https://boltbucketapi.up.railway.app/exteriors')
      const json = await response.json()
      setExterior(json)
      return json
    }

    const fetchRoofOptions = async () => {
      const response = await fetch('https://boltbucketapi.up.railway.app/roofs')
      const json = await response.json()
      setRoof(json)
      return json
    }

    const fetchWheelOptions = async () => {
      const response = await fetch('https://boltbucketapi.up.railway.app/wheels')
      const json = await response.json()
      setWheels(json)
      return json
    }

    const fetchInteriorOptions = async () => {
      const response = await fetch('https://boltbucketapi.up.railway.app/interiors')
      const json = await response.json()
      setInterior(json)
      return json
    }

    const fetchCustomCars = async () => {
      const response = await fetch('https://boltbucketapi.up.railway.app/customcars')
      const json = await response.json()
      setCustom(json)
      return json
    }

    fetchExteriorOptions()
    fetchRoofOptions()
    fetchWheelOptions()
    fetchInteriorOptions()
    fetchCustomCars()
  }, [])

  let element = useRoutes([
    {
      path: '/',
      element: <Options exterior={exterior} roof={roof} wheels={wheels} interior={interior} />
    },
    {
      path: '/customcars',
      element: <ViewCustomCars data={custom} />
    },
    {
      path: '/customcars/:id',
      element: <CustomCar data={custom} />
    },
    {
      path: '/edit/:id',
      element: <EditCustomCar data={custom} exteriorOptions={exterior} roofOptions={roof} wheelOptions={wheels} interiorOptions={interior} />
    }
  ])

  return (
    <div className="App">

      <header>
        <h1>Bolt Bucket 🏎️</h1>

        <div className="nav-buttons">
          <Link to="/" role="button">Customize</Link>
          <Link to="/customcars" role="button">View Cars</Link>
        </div>
      </header>
      
      <main>
        {element}
      </main>
    
    </div>
  )
}

export default App