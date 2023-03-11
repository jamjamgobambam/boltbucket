import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './db/db.js'
import exteriorRoutes from './routes/exterior.js'
import interiorRoutes from './routes/interior.js'
import roofRoutes from './routes/roofs.js'
import wheelRoutes from './routes/wheels.js'

dotenv.config()

const server = express()
const SERVER_PORT = process.env.PORT || 8081

server.use(bodyParser.urlencoded( {extended: true} ))
server.use(bodyParser.json( {extended: true} ))
server.use(cors())

server.use('/exteriors', exteriorRoutes)
server.use('/interiors', interiorRoutes)
server.use('/roofs', roofRoutes)
server.use('/wheels', wheelRoutes)

server.listen(SERVER_PORT, () => {
    console.log(`server listening at http://localhost:${SERVER_PORT}`)
})