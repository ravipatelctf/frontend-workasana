import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LangingPage";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import {ToastContainer} from "react-toastify";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Reports from "./pages/Reports";
import TeamManagement from "./pages/TeamManagement";
import ProjectManagement from "./pages/ProjectManagement";
import TaskDetails from "./pages/TaskDetails";
import ProjectDetails from "./pages/ProjectDetails";
import TaskManagement from "./pages/TaskManagement";
import Settings from "./pages/Settings";

export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/:userEmail" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/teams" element={<TeamManagement />} />
                    <Route path="/projects" element={<ProjectManagement />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/tasks" element={<TaskManagement />} />
                    <Route path="/tasks/:taskId" element={<TaskDetails />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Router>
            <ToastContainer 
                autoClose={2000} 
                position="top-center"
                closeButton={true}
                closeOnClick={true}
                pauseOnHover
                draggable
            />
        </>
    );
}