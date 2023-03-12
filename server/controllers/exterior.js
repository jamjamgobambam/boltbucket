import { pool } from '../db/db.js'

export const getExteriors = async (req, res) => {
    try {
        const category = 'exterior'
        const results = await pool.query('SELECT * FROM options WHERE category=$1 ORDER BY id ASC', [category])
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
        const category = 'exterior'
        const extId = parseInt(req.params.extId)
        const results = await pool.query('SELECT * FROM options WHERE category=$1 AND id=$2', [category, extId])
        res.status(200).json(results.rows[0])
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve exterior with id', req.params.extId)
        console.log('error', error.message)
    }
}