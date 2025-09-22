
import PageLayout from "./PageLayout";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";

export default function TaskManagement() {

    const {data: tasks} = useFetchGet(`${baseUrl}/tasks`);
    
    console.log("tasks:", tasks);
    return (
        <PageLayout>
            <main>
                <h2 className="text-center fw-bold">Task Management</h2>
            </main>
        </PageLayout>
    );
}