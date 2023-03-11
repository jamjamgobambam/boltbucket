import { pool } from '../db/db.js'

export const getWheels = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM wheels ORDER BY id ASC')
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve wheel options')
        console.log('error:', error.message)
    }
}

export const getWheelsById = async (req, res) => {
    try {
        const wheelId = parseInt(req.params.wheelId)
        const results = await pool.query('SELECT * FROM wheels WHERE id=$1', [wheelId])
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve wheels with id', req.params.wheelId)
        console.log('error', error.message)
    }
}