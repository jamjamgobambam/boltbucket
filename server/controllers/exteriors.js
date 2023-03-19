import { pool } from '../config/database.js'

const getExteriors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM exteriors ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getExteriorsById = async (req, res) => {
    try {
        const extId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM exteriors WHERE id=$1', [extId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getExteriors,
    getExteriorsById
}