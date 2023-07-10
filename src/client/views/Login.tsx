import * as React from "react";
import swal from "sweetalert"
import { useState } from "react";
import { TOKEN_KEY, apiService } from "../services/api-service";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const data = { email, password };
    const nav = useNavigate();

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        apiService("/auth/login", "POST", data)
            .then(token => {
                localStorage.setItem(TOKEN_KEY, token);
                nav('/books');
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    };

    return (
        <div>
            <div>
                <div>
                    <div>
                        <h2>Please Sign In</h2>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input className="form-control" id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="password">Password</label>
                            <input className="form-control" id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                    <div>
                        <span>Don't have an account? </span>
                        <Link to={'/register'}>Sign up here!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;