import { pool } from '../db/db.js'

export const getRoofs = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM roofs ORDER BY id ASC')
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve roof options')
        console.log('error:', error.message)
    }
}

export const getRoofsById = async (req, res) => {
    try {
        const roofId = parseInt(req.params.roofId)
        const results = await pool.query('SELECT * FROM roofs WHERE id=$1', [roofId])
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve roof with id', req.params.roofId)
        console.log('error', error.message)
    }
}