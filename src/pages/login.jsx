
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import {toast} from "react-toastify";
import Header from "../components/Header";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        toast.info("Logging in...")
        const payload = {email, password};
        try {
            const token = await login(payload);
        
            // store data in local storage
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("email", email)
            if (token) {
                navigate(`/${email}`);
            }
        } catch (error) {
            toast.error("Email or Password is incorrect.");
        }

    }

    return (
        <>
        <Header />
        <div className="container py-4">
            <h2 className="text-center">Workasana Login</h2>
            <form onSubmit={handleLogin}>
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
                id="email"
                type="email"
                required
                value={email}
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
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
            />
            <br />
            <button 
                type="submit" 
                className="btn btn-primary fw-bold"
            >
                Login
            </button>
            </form>
        </div>
        </>
    );
}