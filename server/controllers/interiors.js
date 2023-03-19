import { pool } from '../config/database.js'

const getInteriors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM interiors ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getInteriorsById = async (req, res) => {
    try {
        const intId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM interiors WHERE id=$1', [intId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getInteriors,
    getInteriorsById
}