import * as React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>NO. LET HIM BOOK.</h1>
            <Link to={'/register'}>Sign up here!</Link>
            <span>     -or-     </span>
            <Link to={'/Login'}>Sign back in!</Link>
        </div>
    )
};

export default Home;