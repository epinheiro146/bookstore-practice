import { Query } from "..";
import { Category } from "../../../types";

const getAll = () => Query<Category[]>(`SELECT * FROM categories`);

const getById = (id: number) => Query<Category[]>(`SELECT * FROM categories WHERE id=?`, [id]);

export default {
    getAll,
    getById
};