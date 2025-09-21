import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../api";
import { toast } from "react-toastify";
import Header from "../components/Header";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSignup() {
        toast.info("Sign up in progress...");
        if (!name || !email || !password) {
            return;
        }
        const payload = {name, email, password};
        try {
            const data = await signup(payload);
            if (data) {
                toast.success("Sign up successful.")
                navigate(`/login`);
            }    
        } catch (error) {
            toast.info("You already have an account. Try Logging in.");
        }

        setName("")
        setEmail("")
        setPassword("")
    }

    return (
        <>
        <Header />
        <div className="container py-4">
            <h2 className="text-center">Workasana Signup</h2>
            <label htmlFor="name" className="form-label">Name:</label>
            <input
                id="name"
                type="text"
                required
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
            />
            <br />
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
                className="btn btn-primary"
                onClick={handleSignup}
            >
                SignUp
            </button>
        </div>
        </>
    );
}