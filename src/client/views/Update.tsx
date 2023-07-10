import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookWCatName, Category } from "../../types";
import { apiService } from "../services/api-service";
import ReactSelect from "react-select";
import swal from "sweetalert";

const Update = () => {

    const { id } = useParams();
    const nav = useNavigate();
    const [bookDetails, setBookDetails] = useState<BookWCatName>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [updatedCategory, setUpdatedCategory] = useState<number>();
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedAuthor, setUpdatedAuthor] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");

    useEffect(() => {
        apiService('/api/categories')
            .then(data => setCategories(data))
            .catch(error => swal("Oops!", error.message, "error"));
    }, []);

    const options = categories.map(t => (
        { value: `${t.id}`, label: `${t.name}` }
    ));

    const handleCategorySelection = e => {
        console.log(e);
        setUpdatedCategory(e.value);
    };

    useEffect(() => {
        apiService(`/api/books/${id}`)
            .then(data => {
                setBookDetails(data);
                setUpdatedCategory(data.categoryid);
                setUpdatedTitle(data.title);
                setUpdatedAuthor(data.author);
                setUpdatedPrice(data.price);
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    }, [id]);

    const handleSaveChanges = () => {
        apiService(`/api/books/${id}`, "PUT", { categoryid: updatedCategory, title: updatedTitle, author: updatedAuthor, price: updatedPrice })
            .then(data => {
                swal("Looking good!", `${data.message}`, "success");
                nav(`/books/${id}`);
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    };

    return (

        <div>
            <div>
                <h1>Editing Book Listing:</h1>
            </div>
            <div>
                {bookDetails && (
                    <div>
                        <p>Category</p>
                        <ReactSelect options={options} onChange={handleCategorySelection} />
                        <p>Title</p>
                        <textarea value={updatedTitle} onChange={e => setUpdatedTitle(e.target.value)} />
                        <p>Author</p>
                        <textarea value={updatedAuthor} onChange={e => setUpdatedAuthor(e.target.value)} />
                        <p>Price</p>
                        <span>$</span> <textarea value={updatedPrice} onChange={e => setUpdatedPrice(e.target.value)} />
                        <div>
                            <button onClick={handleSaveChanges}>Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Update;