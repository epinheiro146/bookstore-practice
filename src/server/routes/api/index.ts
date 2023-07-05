import * as express from "express";
import booksRouter from "./books";
import categoriesRouter from "./categories";

const router = express.Router();

router.use("/health", (req, res) => {
    const timestamp = new Date().toLocaleString();
    res.status(200).json({ message: "Nice. Server is working.", timestamp });
});

router.use("/books", booksRouter);
router.use("/categories", categoriesRouter);

export default router;