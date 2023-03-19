import { pool } from '../config/database.js'

const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const getCarById = async (req, res) => {
    try {
        const custId = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM cars WHERE id=$1', [custId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const createCar = async (req, res) => {
    try {
        const { name, isconvertible, exterior, roof, wheels, interior, price } = req.body
        const results = await pool.query(
            `INSERT INTO cars (name, isconvertible, exterior, roof, wheels, interior, price)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [name, isconvertible, parseInt(exterior), parseInt(roof), parseInt(wheels), parseInt(interior), parseInt(price)]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const updateCar = async (req, res) => {
    try {
        const { name, exterior, roof, wheels, interior, price } = req.body
        const carId = parseInt(req.params.id)

        const results = await pool.query(
            `UPDATE cars SET name=$1, exterior=$2, roof=$3, wheels=$4, interior=$5, price=$6 WHERE id=$7`,
            [name, parseInt(exterior), parseInt(roof), parseInt(wheels), parseInt(interior), parseInt(price), carId]
        )

        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

const deleteCar = async (req, res) => {
    const custId = parseInt(req.params.id)

    try {
        const results = await pool.query('DELETE FROM cars WHERE id=$1', [custId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( {error: error.message} )
    }
}

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}