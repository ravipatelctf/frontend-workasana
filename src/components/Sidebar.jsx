import { Link, useNavigate } from "react-router-dom";

import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaTasks } from "react-icons/fa";

export default function Sidebar() {
    const navigate = useNavigate();

    const email = sessionStorage.getItem("email");

    function handleLogout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email")
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }

    return (
        <div className="container d-flex flex-column gap-4 w-100 py-3">
            <div className="d-flex flex-column gap-3">
                <div className="fw-bold fs-2 d-none d-md-block" style={{color: "#8D5F8C"}}>Workasana</div>
                <Link to={`/${email}`} className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <MdOutlineDashboard className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Dashboard</span>
                </Link>
                <Link to="/tasks" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <FaTasks className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Tasks</span>
                </Link>
                <Link to="/projects" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <FaProjectDiagram className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Project</span>
                </Link>
                <Link to="/teams" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <AiOutlineTeam className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Team</span>
                </Link>
                <Link to="/reports" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <TbReport className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Reports</span>
                </Link>
                <Link to="/settings" className="fw-bold mb-1 text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <IoMdSettings className="fs-4 text-secondary" />
                    <span className="fw-bold fs-5 text-secondary">Settings</span>
                </Link>

                <div type="button" onClick={handleLogout} className="fw-bold mb-1 text-danger text-decoration-none d-flex align-items-center gap-1">
                    <MdLogout className="fs-4 text-danger" />
                    <span className="fw-bold fs-5 text-danger">Logout</span>
                </div>
            </div>
        </div>
    );
}