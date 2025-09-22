

import PageLayout from "./PageLayout";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";
import { Link, useParams } from "react-router-dom";

export default function ProjectManagement() {

    const {data: projects} = useFetchGet(`${baseUrl}/projects`);
    const {data: tasks} = useFetchGet(`${baseUrl}/tasks`);
    
    const {projectId} = useParams();

    const targetProject = projects?.find((project) => project._id === projectId); 

    const filteredTasks = tasks?.filter((task) => task.project._id === projectId);

    console.log("filteredTasks:", filteredTasks);

    return (
        <div>
            <PageLayout>
                {   filteredTasks ? (
                <main>
                    <h2 className="fw-bold">{targetProject?.name}</h2>
                    <p>{targetProject?.description}</p>
                    <div className="py-4">
                    <table className="table">
                        <thead className="">
                            <tr className="table-primary">
                                <th scope="col" className="text-secondary">TASKS</th>
                                <th scope="col" className="text-secondary">TEAM</th>
                                <th scope="col" className="text-secondary">STATUS</th>
                                <th scope="col" className="text-secondary">DUE ON</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredTasks && filteredTasks.map((task) => (
                                    
                                    <tr key={task?._id}>
                                        <th scope="row">{task?.name}</th>
                                        <td>{task?.team?.name}</td>
                                        <td><div className="rounded px-2 fw-bold my-2" style={{width: "fit-content", backgroundColor: "#FFECC0", color: "#B95E82"}}>{task.status}</div></td>
                                        <td>{new Date(task?.dueDate).toDateString()}</td>
                                        <td><Link to={`/tasks/${task?._id}`} className="text-decoration-none">➡️</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                </main> 
                ) : (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </PageLayout>
        </div>
    );
}