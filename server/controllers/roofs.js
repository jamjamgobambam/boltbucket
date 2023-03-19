import { pool } from '../config/database.js'

const getRoofs = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM roofs ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getRoofsById = async (req, res) => {
    try {
        const roofId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM roofs WHERE id=$1', [roofId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getRoofs,
    getRoofsById
}