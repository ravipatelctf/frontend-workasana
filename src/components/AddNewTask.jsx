
import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";
import { useFetchPost } from "../useFetchPost";


export function AddNewTask({ setReferesh, handleShowAddNewTask}) {
    const [name, setName] = useState("");
    const [project, setProject] = useState("");
    const [team, setTeam] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState("To Do");

    const {data: projectsData, fetchData: fetchProjects} = useFetchGet(`${baseUrl}/projects`);
    const {data: teamsData, fetchData: fetchTeams} = useFetchGet(`${baseUrl}/teams`);
    const {data: tagsData, fetchData: fetchTags} = useFetchGet(`${baseUrl}/tags`);
    const {postData, error} = useFetchPost(`${baseUrl}/tasks`);

    function handleFormCancel() {
        setName("")
        setProject("")
        setTeam("")
        setTags([])
        setStatus("To Do")
        setDueDate(null)
        handleShowAddNewTask(false)
    }

    function handleTagSelect(e) {
        const {checked, value} = e.target;
        if (checked) {
            setTags((pv) => [...pv, value])
        } else {
            setTags((pv) => pv.filter((item => item !== value)));
        }
    }

    
    async function handleFormSubmit(e) {
        e.preventDefault();
        if (tags.length === 0) {
            toast.warn("Please select at least one tag.");
            return;
        }

        if (!name || !project || !team || !tags || !status || !dueDate) {
            return;
        }

        toast.info("Creating Task...");
        const payload = {
            "name": name,
            "project": project,
            "team": team,
            "tags": tags,
            "status": status,
            "dueDate": dueDate
        };

        try {
            await postData(payload);
            setReferesh((preValue) => preValue + 1);
            setName("");
            setProject("");
            setTeam("");
            setTags([]);
            setStatus("To Do");
            setDueDate(null);
            handleShowAddNewTask(false);   
        } catch (err) {
            toast.error("Failed to create task.");
            console.error(err)
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
                    <h5 className="modal-title">Create New Project</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => handleShowAddNewTask(false)}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="name" className="form-label">Task Name</label>
                        {/* task name */}
                        <input 
                            type="text"
                            required
                            value={name}
                            placeholder="Enter Task Name"
                            onChange={(e) => setName(e.target.value)}
                            className="form-control mb-3" />

                        {/* project */}
                        <label htmlFor="project" className="form-label">Project</label>
                        <select 
                            id="project"
                            required
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            className="form-select mb-3"
                        >
                            <option value="" disabled>Select Project</option>
                            {
                                projectsData?.map((project) => (
                                    <option key={project._id} value={project._id}>{project.name}</option>
                                ))
                            }
                        </select>

                        {/* Team */}
                        <label htmlFor="team" className="form-label">Team</label>
                        <select 
                            id="team"
                            required
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                            className="form-select mb-3"
                        >
                            <option value="" disabled>Select Team</option>
                            {
                                teamsData?.map((team) => (
                                    <option key={team._id} value={team._id}>{team.name}</option>
                                ))
                            }
                        </select>

                        {/* status */}
                        <label htmlFor="status" className="form-label">Status</label>
                        <select 
                            id="status"
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-select mb-3"
                        >
                            <option value="" disabled>Select Status</option>
                            {
                                ["To Do", "In Progress", "Completed", "Blocked"].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>

                        {/* tags */}
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <div className="dropdown">
                            <button 
                                className="btn btn-secondary dropdown-toggle" 
                                type="button" 
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Select Tags
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    tagsData?.map((tag) => (
                                        <li key={tag._id} className="dropdown-item">
                                            <input type="checkbox" className="me-2" value={tag._id} onChange={(e) => handleTagSelect(e)} />
                                            {tag.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/* dueDate */}
                        <label htmlFor="dueDate" className="form-label">Select due date:</label>
                        <input 
                            type="date" 
                            id="dueDate"
                            required
                            value={dueDate || ""}
                            onChange={(e) => setDueDate(e.target.value) }
                            className="form-control mb-3" />

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
