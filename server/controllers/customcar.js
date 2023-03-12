import { pool } from '../db/db.js'

export const getCustomCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM customcar ORDER BY id ASC')
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve custom cars')
        console.log('Error: ', error.message)
    }
}

export const getCustomCarById = async (req, res) => {
    try {
        const custId = parseInt(req.params.custId)
        const results = await pool.query('SELECT * FROM customcar WHERE id=$1', [custId])
        res.status(200).json(results.rows)
        console.log(results.rows)
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to retrieve custom car with id', req.params.custId)
        console.log('Error: ', error.message)
    }
}

export const createCustomCar = async (req, res) => {
    try {
        const { name, exterior_id, roof_id, wheels_id, interior_id } = req.body
        const results = await pool.query(
            `INSERT INTO customcar (name, exterior_id, roof_id, wheels_id, interior_id)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, parseInt(exterior_id), parseInt(roof_id), parseInt(wheels_id), parseInt(interior_id)]
        )

        res.status(201).json(results.rows[0])
        console.log('new custom car created')
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to create new custom car')
        console.log('Error: ', error.message)
    }
}

export const deleteCustomCar = async (req, res) => {
    const custId = parseInt(req.params.custId)

    try {
        const results = await pool.query('DELETE FROM customcar WHERE id=$1', [custId])
        res.status(200).json(results.rows)
        console.log('custom car deleted')
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to delete custom car')
        console.log('Error: ', error.message)
    }
}

export const updateCustomCar = async (req, res) => {
    try {
        const { name, exterior_id, roof_id, wheels_id, interior_id } = req.body
        const custId = req.params.custId

        const results = await pool.query(
            `UPDATE customcar SET name=$1, exterior_id=$2, roof_id=$3, wheels_id=$4, interior_id=$5 WHERE id=$6`,
            [name, exterior_id, roof_id, wheels_id, interior_id, custId]
        )

        res.status(200).json(results.rows)
        console.log('custom car updated')
    } catch (error) {
        res.status(409).json( {error: error.message} )
        console.log('unable to update custom car')
        console.log('Error: ', error.message)
    }
}