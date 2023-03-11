import React, { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import '~picocss/pico.min.css'
import Options from './components/Options'

const App = () => {

  const [ exterior, setExterior ] = useState([])
  const [ roof, setRoof ] = useState([])
  const [ wheels, setWheels ] = useState([])
  const [ interior, setInterior ] = useState([])

  useEffect(() => {
    const fetchExterior = async () => {
      const exteriorData = 'https://boltbucketapi.up.railway.app/exteriors'
      const response = await fetch(exteriorData)
      const exteriorJson = await response.json()
      setExterior(exteriorData)
      return exteriorJson
    }

    const fetchRoof = async () => {
      const roofData = 'https://boltbucketapi.up.railway.app/roofs'
      const response = await fetch(roofData)
      const roofJson = await response.json()
      setRoof(roofData)
      return roofJson
    }

    const fetchWheels = async () => {
      const wheelData = 'https://boltbucketapi.up.railway.app/wheels'
      const response = await fetch(wheelData)
      const wheelJson = await response.json()
      setWheels(wheelData)
      return wheelJson
    }

    const fetchInterior = async () => {
      const interiorData = 'https://boltbucketapi.up.railway.app/interiors'
      const response = await fetch(interiorData)
      const interiorJson = await response.json()
      setInterior(interiorData)
      return interiorJson
    }

    fetchExterior()
    fetchWheels()
    fetchRoof()
    fetchInterior()
  }, [])

  let element = useRoutes([
    {
      path: '/',
      element: <Options exterior={exterior} wheels={wheels} roof={roof} interior={interior} />
    }
  ])

  return (
    <div className="App">
      
      {element}
      
      <div>
        <button>Customize</button>
      </div>
    </div>
  )
}

export default App