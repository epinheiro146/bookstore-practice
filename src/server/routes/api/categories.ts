import * as express from "express";
import Categories from "../../db/queries/categories";

const router = express.Router();

// GET /api/categories/?
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const category = await Categories.getById(id);
        res.json(category[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting a category, but something went wrong." })
    }
});

// GET /api/categories
router.get('/', async (req, res) => {
    try {
        const categories = await Categories.getAll();
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting all categories, but something went wrong." })
    }
});

export default router;