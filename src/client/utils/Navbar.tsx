import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../services/api-service";
const Navbar = () => {

    const TOKEN = localStorage.getItem('token');
    const nav = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem(TOKEN_KEY);
        nav('/login');
    };

    return <div>
        <Link className="mx-2" to={"/"}>
            Home
        </Link>
        <Link className="mx-2" to={"/books"}>
            Books
        </Link>
        <Link className="mx-2" to={"/books/new"}>
            Add Book
        </Link>
        {!TOKEN && (
            <Link className="mx-2" to={"/login"}>
                Login
            </Link>
        )}
        {TOKEN && (
            <button onClick={handleLogout}>
                Logout
            </button>
        )}
    </div>;
};

export default Navbar;