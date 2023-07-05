import { Query } from "..";
import { Book, BookWCatName } from "../../../types";

const getAll = () => Query<BookWCatName[]>(
    `SELECT
    c.name as categoryname,
    b.*
    FROM books b
    JOIN categories c on b.categoryid = c.id
    ORDER BY b.id`);

const getById = (id: number) => Query<BookWCatName[]>(
    `SELECT
    c.name as categoryname,
    b.*
    FROM books b
    JOIN categories c on b.categoryid = c.id
    WHERE b.id=?`, [id]);

const create = (categoryid: number, title: string, author: string, price: number) => Query("INSERT INTO books (categoryid, title, author, price) VALUES (?, ?, ?, ?)", [categoryid, title, author, price]);
const update = (categoryid: Book['categoryid'], title: Book['title'], author: Book['author'], price: Book['price'], id: Book['id']) => Query("UPDATE books SET categoryid=?, title=?, author=?, price=? WHERE id=?", [categoryid, title, author, price, id]);
const destroy = (id: Book['id']) => Query("DELETE FROM books WHERE id=?", [id]);

export default {
    getAll,
    getById,
    create,
    update,
    destroy
};