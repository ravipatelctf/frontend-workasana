
import PageLayout from "./PageLayout";
import { useFetchGet } from "../useFetchGet";
import {baseUrl} from "../api";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut, Bar, Pie } from "react-chartjs-2";




function TaskByProjects({completedTasksByProject}) {
    const data = {
        labels: Object.keys(completedTasksByProject), // task status
        datasets: [
            {
                label: "Completed Task By projects",
                data: Object.values(completedTasksByProject), // task counts
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

    return <Pie datasetIdKey="TaskByProject" data={data} />; 
}



function TaskByTeamMembers({completedTasksByTeam}) {
    const data = {
        labels: Object.keys(completedTasksByTeam), // task status
        datasets: [
            {
                label: "Task By Team Members",
                data: Object.values(completedTasksByTeam), // task counts
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

    return <Pie datasetIdKey="TaskByTeamMembers" data={data} />; 
}


function TaskByStatusChart({taskStatusCount}) {
    const data = {
        labels: Object.keys(taskStatusCount), // task status
        datasets: [
            {
                label: "Task By Status Chart",
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

    return <Doughnut datasetIdKey="TaskByStatusChart" data={data} />; 
}

export default function Reports() {
    const {data: tasks} = useFetchGet(`${baseUrl}/tasks`);

    console.log("tasks:", tasks);

    const taskStatusCount = tasks?.reduce((acc, curr) => {
        acc[curr.status] = acc[curr.status] + 1
        return acc;
    }, {"To Do": 0, "In Progress": 0, "Completed": 0, "Blocked": 0});

    const completedTasksByTeam = tasks?.reduce((acc, curr) => {
        acc[curr.team.name] = acc[curr.team.name] || 0;
        acc[curr.team.name] += curr.status === "Completed" ? 1 : 0;
        return acc;
    }, {});

    const completedTasksByProject = tasks?.reduce((acc, curr) => {
        acc[curr.project.name] = acc[curr.project.name] || 0;
        acc[curr.project.name] += curr.status === "Completed" ? 1 : 0; 
        return acc;
    }, {});
    

    return (
        <PageLayout>
            <main>
                <div className="row">

                    {/* 1st chart */}
                    <div className="col-md-5 mb-2">
                        <div className="card">
                        <h5 className="card-header fw-bold">No. of Tasks by Status</h5>
                        <div className="card-body">
                            {taskStatusCount && <TaskByStatusChart taskStatusCount={taskStatusCount}  />}
                        </div>
                        </div>
                    </div>

                    {/* 2nd chart */} 
                    <div className="col-md-5 mb-2">
                        <div className="card">
                        <h5 className="card-header fw-bold">Tasks completed by each Team</h5>
                        <div className="card-body">
                            {completedTasksByTeam && <TaskByTeamMembers completedTasksByTeam={completedTasksByTeam}  />}
                        </div>
                        </div>
                    </div>

                    {/* 3nd chart */}
                    <div className="col-md-5 mb-2">
                        <div className="card">
                        <h5 className="card-header fw-bold">Tasks completed in each Project</h5>
                        <div className="card-body">
                            {completedTasksByProject && <TaskByProjects completedTasksByProject={completedTasksByProject}  />}
                        </div>
                        </div>
                    </div>

                </div>
            </main>
        </PageLayout>
    );
}