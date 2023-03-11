import { pool } from '../db/db.js'

export const getExteriors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM exteriors ORDER BY id ASC')
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve exterior options')
        console.log('error:', error.message)
    }
}

export const getExteriorById = async (req, res) => {
    try {
        const extId = parseInt(req.params.extId)
        const results = await pool.query('SELECT * FROM exteriors WHERE id=$1', [extId])
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve exterior with id', req.params.extId)
        console.log('error', error.message)
    }
}