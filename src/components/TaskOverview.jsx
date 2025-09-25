
import { useEffect, useState } from "react";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";
import { Link } from "react-router-dom";



function FilterTasksByStatus({tasks, setFilteredTasks, filterByStatus, setFilterByStatus}) {
    

    useEffect(() => {
        if (filterByStatus) {
            const result = tasks?.filter((task) => task.status === filterByStatus);
            setFilteredTasks(result)
        } else {
            setFilteredTasks(tasks)
        }

    }, [filterByStatus, tasks, setFilteredTasks]);
    

    return (
        <select 
            id="filterByStatus"
            value={filterByStatus}
            className="form-select"
            onChange={(e) => setFilterByStatus(e.target.value)}
        >
            <option value="" disabled>Filter By status:</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>   
        </select>
    );
}



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
    
    const [filterByStatus, setFilterByStatus] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);

    
    useEffect(() => {
        fetchData();
    }, [referesh]);


    useEffect(() => {
        if (tasks) {
            setFilteredTasks(tasks);
        }
    }, [tasks]);

    function handleClearFilter() {
        setFilteredTasks([]);
        setFilterByStatus("");
    }
    
    return (
        <section className="mb-5">
            <div className="row align-items-center justify-content-between">
                <div className="col-md-9">
                    <div className="d-flex align-items-center justify-content-start gap-1 mb-2">
                        <h3 className="m-0 fs-2 fw-bold">Tasks</h3>
                        {tasks && <FilterTasksByStatus tasks={tasks} setFilteredTasks={setFilteredTasks} filterByStatus={filterByStatus} setFilterByStatus={setFilterByStatus} />}
                        <div>
                            <button className="btn btn-outline-dark fw-bold btn-sm" onClick={handleClearFilter}>Clear</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 text-center mb-2">
                    <button 
                        onClick={() => handleShowAddNewTask(true)} 
                        className="btn btn-primary fw-bold btn-sm">
                        + New Task
                    </button>
                </div>
            </div>
            <div className="row mt-3">
                {
                    tasks ? ( filteredTasks?.map((task) => (
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