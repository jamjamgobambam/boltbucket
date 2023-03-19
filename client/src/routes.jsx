import React from 'react'

import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'

const routes = () => [
    {
        path: '/',
        element: <CreateCar title='BOLT BUCKET | Customize' />
    },
    {
        path: '/edit/:id',
        element: <EditCar title='BOLT BUCKET | Edit' />
    },
    {
        path: '/customcars',
        element: <ViewCars title='BOLT BUCKET | Custom Cars' />
    },
    {
        path: '/customcars/:id',
        element: <CarDetails title='BOLT BUCKET | View' />
    }
]

export default routes