
import { useNavigate } from "react-router-dom";
import PageLayout from "./PageLayout";
import { useEffect, useState } from "react";

import { ProjectOverview } from "../components/ProjectOverview";
import { TaskOverview } from "../components/TaskOverview";
import { AddNewTask } from "../components/AddNewTask";
import { AddNewProject } from "../components/AddNewProject";

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










