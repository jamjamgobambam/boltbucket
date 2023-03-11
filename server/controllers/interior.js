import { pool } from '../db/db.js'

export const getInteriors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM interiors ORDER BY id ASC')
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve interior options')
        console.log('error:', error.message)
    }
}

export const getInteriorById = async (req, res) => {
    try {
        const intId = parseInt(req.params.intId)
        const results = await pool.query('SELECT * FROM interiors WHERE id=$1', [intId])
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve interior with id', req.params.intId)
        console.log('error', error.message)
    }
}