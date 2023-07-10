import * as React from "react";
import { useState, useEffect } from "react";
import { BookWCatName } from "../../types";
import { Link } from "react-router-dom";
import { apiService } from "../services/api-service";
import swal from "sweetalert";

const Books = () => {
    const [books, setBooks] = useState<BookWCatName[]>([]);

    useEffect(() => {
        apiService(`/api/books`)
            .then(data => setBooks(data))
            .catch(error => swal("Oops!", error.message, "error"));
    }, []);

    return (
        <div>
            <h1>Store</h1>
            {books.map(book => (
                <div key={`book-${book.id}`}>
                    <div className="card">
                        <Link to={`/books/${book.id}`}>
                            <div>
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                <p>${book.price}</p>
                                <p>category: {book.categoryname}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Books;