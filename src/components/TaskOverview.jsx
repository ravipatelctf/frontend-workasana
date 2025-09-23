
import { useEffect } from "react";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";
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


export function TaskOverview({referesh, handleShowAddNewTask}) {

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