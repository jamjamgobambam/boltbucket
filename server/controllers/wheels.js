import { pool } from '../db/db.js'

export const getWheels = async (req, res) => {
    try {
        const category = 'wheels'
        const results = await pool.query('SELECT * FROM options WHERE category=$1 ORDER BY id ASC', [category])
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
        const category = 'wheels'
        const wheelId = parseInt(req.params.wheelId)
        console.log(wheelId)
        const results = await pool.query('SELECT * FROM options WHERE category=$1 AND id=$2', [category, wheelId])
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve wheels with id', req.params.wheelId)
        console.log('error', error.message)
    }
}