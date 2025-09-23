
import { useEffect } from "react";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";
import { Link } from "react-router-dom";

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


export function ProjectOverview({referesh, handleShowAddNewProject}) {

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