
import { useEffect, useState } from "react";
import PageLayout from "./PageLayout";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";
import {useFetchPost} from "../useFetchPost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TeamManagement() {
    const {data: teams, fetchData: fetchTeams} = useFetchGet(`${baseUrl}/teams`);
    const [showAddNewTeam, setShowAddNewTeam] = useState(false);
    const [referesh, setReferesh] = useState(0);

    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
    }, [token]);

    if (!token) {
        return;
    }

    useEffect(() => {
        fetchTeams();
    }, [referesh]);

    function handleShowAddNewTeam(value) {
        setShowAddNewTeam(value)
    }

    const textColor = ["#D2C1B6", "#6D94C5"];
    const bgColor = ["#1B3C53", "#6B3F69", "#9A3F3F"]

    return (
        <div>
            <PageLayout>
                {showAddNewTeam && <AddNewTeam referesh={referesh} setReferesh={setReferesh} handleShowAddNewTeam={handleShowAddNewTeam} />}
                <main>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-1 mb-2">
                            <h3 className="m-0 fs-2 fw-bold">Teams</h3>
                        </div>
                        <button
                            onClick={() => handleShowAddNewTeam(true)}
                            className="btn btn-primary fw-bold btn-sm">
                            + New Team
                        </button>
                    </div>
                    <div className="row py-4">
                        {
                            teams ? (teams.map((team) => (
                                <div key={team._id} className="col-md-4 mb-2">
                                    <div className="card">
                                        <h5 className="fw-bold card-header">{team.name.toLowerCase().includes("team") ? team.name : `${team.name} Team` }</h5>
                                        <div className="card-body">
                                            <div className="row">
                                                { team.teamMembers.map((member, index) => (
                                                    <div key={member._id} className="col-2">
                                                        <span className="fs-1 text-light rounded-circle px-3" style={{backgroundColor: `${bgColor[index]}`, color: `${textColor[index]}`}}>{member.name.split("")[0].toUpperCase()}</span>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))) : (
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </main>
            </PageLayout>
        </div>
    );
}




function AddNewTeam({referesh, setReferesh, handleShowAddNewTeam}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [teamMembers, setTeamMembers] = useState([]);

    const {data: users, fetchData: fetchUsers} = useFetchGet(`${baseUrl}/users`);
    const {postData} = useFetchPost(`${baseUrl}/teams`);

    function handleFormCancel() {
        setName("")
        setDescription("")
        setTeamMembers([])
        handleShowAddNewTeam(false)
    }

    
    function handleFormSubmit(e) {
        e.preventDefault();
        const payload = {
            "name": name,
            "description": description,
            "teamMembers": teamMembers
        };
        toast.info("Creating Task...");

        try {
            postData(payload);
        } catch (error) {
            console.error(error);
        } finally {
            setReferesh((preValue) => preValue + 1);
            setName("");
            setDescription("");
            setTeamMembers([]);
            handleShowAddNewTeam(false);        
        }
    }

    return (
        <div>
        {/* Backdrop */}
        <div className="modal-backdrop fade show"></div>

        {/* Modal */}
        <div className="modal show d-block">
        <div className="modal-dialog modal-dialog-centered">  
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add New Team</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => handleShowAddNewTeam(false)}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="name" className="form-label">Team Name</label>
                        {/* team name */}
                        <input 
                            type="text"
                            required
                            value={name}
                            placeholder="Enter Team Name"
                            onChange={(e) => setName(e.target.value)}
                            className="form-control mb-3" />

                        {/* description */}
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea 
                            id="description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-select mb-3"
                        >
                        </textarea>

                        {/* team members */}
                        <label htmlFor="teamMembers" className="form-label">Team Members</label>
                        <div className="dropdown mb-3">
                            <button 
                                className="btn btn-secondary dropdown-toggle" 
                                type="button" 
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Select Team Members
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    users?.map((user) => (
                                        <li key={user._id} className="dropdown-item">
                                            <input type="checkbox" className="me-2" value={user._id} onChange={(e) => setTeamMembers((pv) => [...pv, e.target.value])} />
                                            {user.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary fw-bold" onClick={handleFormCancel}>Cancel</button>
                            <button type="submit" className="btn btn-primary fw-bold">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}