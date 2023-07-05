export interface User {
    id?: number;
    email?: string;
    password?: string;
    role?: string;
    _created?: string | Date;
    name?: string;
};

export interface Category {
    id?: number;
    name: string;
};

export interface Book {
    id?: number;
    categoryid: Category['id'];
    title: string;
    author: string;
    price: number;
    _created?: string | Date;
};

export interface BookWCatName extends Book {
    categoryname: Category['name'];
};

export interface MysqlResponse {
    affectedRows: number;
    insertId: number;
};

export interface Payload {
    email: string;
    userid: number;
    role: number;
};

declare global {
    namespace Express {
        interface User extends Payload { }
    }
};