import * as React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api-service";
import { Category } from "../../types";
import ReactSelect from "react-select";
import swal from "sweetalert";

const New = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const nav = useNavigate();

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
        setSelectedCategory(e.value);
    };

    const handleSubmitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        apiService("/api/books", "POST", { categoryid: selectedCategory, title: title, author: author, price: price })
            .then((data: any) => {
                swal("Nice!", `${data.message}`, "success");
                nav(`/books`)
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    };

    return (
        <div>
            <div>
                <h1>Adding New Book</h1>
            </div>
            <div>
                <div>
                    <p>Category</p>
                    <ReactSelect options={options} onChange={handleCategorySelection} />
                    <p>Title</p>
                    <textarea value={title} onChange={e => setTitle(e.target.value)} />
                    <p>Author</p>
                    <textarea value={author} onChange={e => setAuthor(e.target.value)} />
                    <p>Price</p>
                    <span>$</span> <textarea value={price} onChange={e => setPrice(e.target.value)} />
                    <div>
                        <button onClick={handleSubmitButton}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;