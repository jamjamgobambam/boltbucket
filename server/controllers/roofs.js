import { pool } from '../db/db.js'

export const getRoofs = async (req, res) => {
    try {
        const category = 'roof'
        const results = await pool.query('SELECT * FROM options WHERE category=$1 ORDER BY id ASC', [category])
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
        const category = 'roof'
        const roofId = parseInt(req.params.roofId)
        const results = await pool.query('SELECT * FROM options WHERE category=$1 AND id=$2', [category, roofId])
        res.status(200).json(results.rows[0])
        console.log(results.rows[0])
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve roof with id', req.params.roofId)
        console.log('error', error.message)
    }
}