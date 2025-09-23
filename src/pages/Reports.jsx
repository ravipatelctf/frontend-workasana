
import PageLayout from "./PageLayout";
import { useFetchGet } from "../useFetchGet";
import {baseUrl} from "../api";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";



// Register only what we need
ChartJS.register(ArcElement, Tooltip, Legend);

function TaskByStatusChart({taskStatusCount}) {
    const data = {
        labels: Object.keys(taskStatusCount), // task status
        datasets: [
            {
                data: Object.values(taskStatusCount), // task counts
                backgroundColor: [
                "#EF476F", // To Do
                "#FFD166", // In Progress
                "#118AB2", // Completed 
                "#06D6A0", // Blocked
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={data} />; 
}

export default function Reports() {
    const {data: tasks, fetchData} = useFetchGet(`${baseUrl}/tasks`);

    console.log("tasks:", tasks);

    const taskStatusCount = tasks?.reduce((acc, curr) => {
        acc[curr.status] = acc[curr.status] + 1
        return acc;
    }, {"To Do": 0, "In Progress": 0, "Completed": 0, "Blocked": 0});

    // task count for status `completed` by team and project
    

    return (
        <PageLayout>
            <main>
                <div className="row">
                    <div className="col-md-5">
                        <div className="card">
                        <h5 className="card-header fw-bold">Task By Status Distribution</h5>
                        <div className="card-body">
                            {taskStatusCount && <TaskByStatusChart taskStatusCount={taskStatusCount}  />}
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </PageLayout>
    );
}
