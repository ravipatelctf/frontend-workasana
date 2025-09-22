
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "./PageLayout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";
import { useFetchPost } from "../useFetchPost";
import { Link } from "react-router-dom";

function TaskCard({task}) {
    return (
        <div className="col-lg-4 col-md-6 mb-2">
            <Link to={`/tasks/${task._id}`} className="text-decoration-none">
                <div className="card px-3">
                    <div className="bg-primary rounded px-2 text-light fw-bold my-2" style={{width: "fit-content"}}>{task.status}</div>
                    <h4 className="fw-bold">{task.name}</h4>
                    <p>Due Date: {new Date(task.dueDate).toDateString()}</p>
                </div>
            </Link>
        </div>
    );
}


function TaskOverview({referesh, handleShowAddNewTask}) {

    const {data: tasks, fetchData} = useFetchGet(`${baseUrl}/tasks`);
    
    useEffect(() => {
        fetchData();
    }, [referesh]);
    
    return (
        <section className="mb-5">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-1 mb-2">
                    <h3 className="m-0 fs-2 fw-bold">Tasks</h3>
                </div>
                <button 
                    onClick={() => handleShowAddNewTask(true)} 
                    className="btn btn-primary fw-bold btn-sm">
                    + New Task
                </button>
            </div>
            <div className="row mt-3">
                {
                    tasks ? ( tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))
                    ) : (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    )
                }
            </div>
        </section>
    );
}


function ProjectCard({project}) {
    return (
        <div className="col-lg-4 col-md-6 mb-2">
            <Link to={`/projects/${project._id}`} className="text-decoration-none">
                <div className="card p-3">
                <h4 className="fw-bold">{project.name}</h4>
                <p className="text-dark">{project.description}</p>
                </div>
            </Link>
        </div>
    );
}


function ProjectOverview({referesh, handleShowAddNewProject}) {

    const {data: projects, loading, error, fetchData} = useFetchGet(`${baseUrl}/projects`);
    
    useEffect(() => {
        fetchData();
    }, [referesh]);
    
    return (
        <section className="mb-5">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-1 mb-2">
                    <h3 className="m-0 fs-2 fw-bold">Projects</h3>
                </div>
                <button 
                    onClick={() => handleShowAddNewProject(true)} 
                    className="btn btn-primary fw-bold btn-sm">
                    + New Project
                </button>
            </div>
            <div className="row mt-3">
                {
                    projects ? ( projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))
                    ) : (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    )
                }
            </div>
        </section>
    );
}



export default function Dashboard() {
    const [showAddNewProject, setShowAddNewProject] = useState(false);
    const [showAddNewTask, setShowAddNewTask] = useState(false);
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

    function handleShowAddNewProject(value) {
        setShowAddNewProject(value)
    }

    function handleShowAddNewTask(value) {
        setShowAddNewTask(value)
    }


    return (
        <div>
            <PageLayout>
                {showAddNewProject && <AddNewProject setReferesh={setReferesh} handleShowAddNewProject={handleShowAddNewProject} />}
                {showAddNewTask && <AddNewTask referesh={referesh} setReferesh={setReferesh} handleShowAddNewTask={handleShowAddNewTask} />}
                <ProjectOverview referesh={referesh} handleShowAddNewProject={handleShowAddNewProject}/>
                <TaskOverview referesh={referesh} handleShowAddNewTask={handleShowAddNewTask}/>
            </PageLayout>
        </div>
    );
}





function AddNewTask({ setReferesh, handleShowAddNewTask}) {
    const [name, setName] = useState("");
    const [project, setProject] = useState("");
    const [team, setTeam] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [tags, setTags] = useState([]);

    const {data: projectsData, fetchData: fetchProjects} = useFetchGet(`${baseUrl}/projects`);
    const {data: teamsData, fetchData: fetchTeams} = useFetchGet(`${baseUrl}/teams`);
    const {data: tagsData, fetchData: fetchTags} = useFetchGet(`${baseUrl}/tags`);
    const {postData} = useFetchPost(`${baseUrl}/tasks`);

    // useEffect(() => {
    //     fetchProjects();
    //     fetchTeams();
    //     fetchTags();
    // }, [referesh])

    function handleFormCancel() {
        setName("")
        setProject("")
        setTeam("")
        setTags([])
        setDueDate(null)
        handleShowAddNewTask(false)
    }

    
    function handleFormSubmit(e) {
        e.preventDefault();
        if (tags.length === 0) {
            toast.warn("Please select at least one tag.");
            return;
        }
        const payload = {
            "name": name,
            "project": project,
            "team": team,
            "tags": tags,
            "dueDate": dueDate
        };
        toast.info("Creating Task...");

        try {
            postData(payload);
        } catch (error) {
            console.error(error);
        } finally {
            setReferesh((preValue) => preValue + 1);
            setName("");
            setProject("");
            setTeam("");
            setTags([]);
            setDueDate(null);
            handleShowAddNewTask(false);        
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
                                            <input type="checkbox" className="me-2" value={tag._id} onChange={(e) => setTags((pv) => [...pv, e.target.value])} />
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





function AddNewProject({setReferesh, handleShowAddNewProject}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const {postData} = useFetchPost(`${baseUrl}/projects`);

    function handleFormCancel() {
        setName("");
        setDescription("");
        handleShowAddNewProject(false)
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!name || !description) {
            return;
        }
        toast.info("Creating Project...");
        const payload = {"name": name, "description": description};
        try {
            postData(payload)
        } catch (err) {
            console.error(error);
        } finally {
            setReferesh((pv) => pv + 1);
            setName("");
            setDescription("");
            handleShowAddNewProject(false)
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
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => handleShowAddNewProject(false)}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="name" className="form-label">Project Name</label>
                        <input 
                            type="text"
                            required
                            value={name}
                            placeholder="Enter Project Name"
                            onChange={(e) => setName(e.target.value)}
                            className="form-control mb-3" />
                        <label htmlFor="description" className="form-label">Project Description</label>
                        <textarea 
                            type="text"
                            required
                            value={description}
                            placeholder="Enter Project Description"
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control mb-3" >
                        </textarea>
                    
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