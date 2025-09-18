import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LangingPage";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import {ToastContainer} from "react-toastify";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";

export default function App() {
    return (
        <>
            
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/:userEmail" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
            <ToastContainer 
                autoClose={1000} 
                position="top-center"
                closeButton={true}
                closeOnClick={true}
                pauseOnHover
                draggable
            />
        </>
    );
}