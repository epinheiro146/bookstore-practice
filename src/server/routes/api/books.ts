import * as express from "express";
import Books from "../../db/queries/books";

import { tokenCheck } from "../../middlewares/auth.mw";

const router = express.Router();

// GET /api/books/?
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const book = await Books.getById(id);
        res.json(book[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting a book, but something went wrong." })
    }
});

// GET /api/books
router.get('/', async (req, res) => {
    try {
        const books = await Books.getAll();
        res.json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried getting all books, but something went wrong." })
    }
});

router.post('/', tokenCheck, async (req, res) => {
    try {
        const { categoryid, title, author, price } = req.body;

        const results = await Books.create(categoryid, title, author, price);

        res.status(201).json({ message: "Added a new book!", id: results.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried adding a book, but something went wrong.", error: error.message })
    }
});

router.put('/:id', tokenCheck, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { categoryid, title, author, price } = req.body;

        await Books.update(categoryid, title, author, price, id);

        res.status(201).json({ message: "Book listing has been updated." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried updating book listing, but something went wrong.", error: error.message })
    }
});

router.delete('/:id', tokenCheck, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const metaDataResults = await Books.destroy(id);
        if (metaDataResults.affectedRows) {
            res.json({ message: "Book listing successfully deleted." });
        } else {
            res.status(404).json({ message: "Book listing either doesn't exist or has already been deleted." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried deleting book listing, but something went wrong.", error: error.message })
    }
});

export default router;