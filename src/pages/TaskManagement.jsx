
import PageLayout from "./PageLayout";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";

export default function TaskManagement() {

    const {data} = useFetchGet(`${baseUrl}/tasks`);
    
    return (
        <div>
            <PageLayout>
                <main>
                    <h2 className="text-center fw-bold">Task Management</h2>
                    <ul className="list-group">
                        {
                            data ? (data.map((task) => (
                                <li key={task._id} className="list-group-item">
                                    <h5 className="fw-bold">{task.name}</h5>
                                    <p><strong>Status: </strong>{task.status}</p>
                                    <p><strong>Due Date: </strong>{new Date(task.dueDate).toDateString()}</p>
                                </li>
                            ))) : (
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )
                        }
                    </ul>
                </main>
            </PageLayout>
        </div>
    );
}