import { useParams } from "react-router-dom";
import { useFetchGet } from "../useFetchGet";
import { baseUrl } from "../api";
import PageLayout from "./PageLayout";



export default function TaskDetails() {
    const {taskId} = useParams();

    const {data} = useFetchGet(`${baseUrl}/tasks`);
    console.log("tasks:", data);

    const targetTask = data?.find((task) => task._id === taskId);
    console.log("targetTask:", targetTask);

    return (
        <div>
            <PageLayout>
                { targetTask ? (
                <main>
                    <h2 className="text-center fw-bold mb-4">{targetTask?.name}</h2>
                    <ul className="list-group px-4 py-2">
                        <li className="list-group-item">
                            <p><strong>Task: </strong>{targetTask?.name}</p>
                            <p><strong>Project: </strong>{targetTask?.project.name}</p>
                            <p><strong>Status: </strong>{targetTask?.status}</p>
                            <p><strong>Due Date: </strong>{new Date(targetTask?.dueDate).toDateString()}</p>
                            <p><strong>Team: </strong>{targetTask?.team.name}</p>
                        </li>
                    </ul>
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