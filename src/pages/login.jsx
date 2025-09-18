
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import {toast} from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const navigate = useNavigate();

    async function handleLogin() {
        toast.info("Logging in...")
        const payload = {email, password};
        console.log("payload:", payload);
        const token = await login(payload);
        
        // store data in local storage
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("email", payload.email);

        if (token) {
            navigate(`/${email}`);
        }
    }

    return (
        <div className="container py-4">
            <h2 className="text-center">Workasana Login</h2>
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
            />
            <br />
            <label htmlFor="password" className="form-label">Password:</label>
            <input
                id="password" 
                type="password"
                required
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
            />
            <br />
            <button 
                type="submit" 
                className="btn btn-primary fw-bold"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
}