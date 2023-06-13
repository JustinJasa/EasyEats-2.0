import express from 'express'
import { getAllCategories } from '../controllers/queries.js'

const routerCategories = express.Router()

// get all categories
routerCategories.route("/").get(async (req, res) => {
    try {
        const queryResult = await getAllCategories()
        res.send(queryResult)
    } catch(error) {
        res.status(500).send("Error:" + error)
    }
});

export default routerCategories