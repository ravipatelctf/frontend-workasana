import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const [tokenStatus, setTokenStatus] = useState(false);

    const {pathname} = useLocation();
    
    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (token) {
            setTokenStatus(true);
        } else {
            setTokenStatus(false);
        }
    }, [pathname]);

    function handleLogout() {
        sessionStorage.removeItem("token");
        setTokenStatus(false);
    }

    return (
        <header className="py-4">
            <div className="container nav align-items-center justify-content-between">
                <Link to="/" className="navbar-brand fw-bold fs-3 d-flex align-items-center ">
                    <span className="border px-1 border-secondary text-light bg-secondary">work</span>
                    <span className="border px-1 border-secondary text-secondary bg-light">asana</span> 
                </Link>
                <ul className="navbar nav gap-2">
                    {
                        (tokenStatus === true) ? (
                            <li className="nav-item">
                                <Link to="/" className="nav-link fw-bold border border-secondary text-light bg-secondary" onClick={handleLogout}>Logout</Link> 
                            </li>
                        ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link fw-bold border border-secondary text-secondary bg-outline-secondary">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link fw-bold border border-secondary text-light bg-secondary">Login</Link> 
                            </li>
                        </>
                        )
                    }
                </ul>
            </div>
        </header>
    );
}