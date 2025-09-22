
import PageLayout from "./PageLayout";
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


export default function TaskManagement() {

    const {data} = useFetchGet(`${baseUrl}/tasks`);
    console.log("tasks:", data);
    return (
        <div>
            <PageLayout>
                <main>
                    <h2 className="text-center fw-bold mb-4">Task Management</h2>
                    <table className="table">
                        <thead className="">
                            <tr className="table-primary">
                                <th scope="col" className="text-secondary">TASKS</th>
                                <th scope="col" className="text-secondary">TEAM</th>
                                <th scope="col" className="text-secondary">PROJECT</th>
                                <th scope="col" className="text-secondary">STATUS</th>
                                <th scope="col" className="text-secondary">DUE ON</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map((task) => (
                                    
                                    <tr key={task._id}>
                                        <th scope="row">{task.name}</th>
                                        <td>{task.team.name}</td>
                                        <td>{task.project.name}</td>
                                        <td><div className="rounded px-2 fw-bold my-2" style={{width: "fit-content", backgroundColor: "#FFECC0", color: "#B95E82"}}>{task.status}</div></td>
                                        <td>{new Date(task.dueDate).toDateString()}</td>
                                        <td><Link to={`/tasks/${task._id}`} className="text-decoration-none">➡️</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </main>
            </PageLayout>
        </div>
    );
}