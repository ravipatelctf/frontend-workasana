

import PageLayout from "./PageLayout";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";

export default function ProjectManagement() {

    const {data} = useFetchGet(`${baseUrl}/projects`);
    
    return (
        <div>
            <PageLayout>
                <main>
                    <h2 className="text-center fw-bold">Project Management</h2>
                    <ul className="list-group">
                        {
                            data ? (data.map((project) => (
                                <li key={project._id} className="list-group-item">
                                    <h5 className="fw-bold">{project.name}</h5>
                                    <p>{project.description}</p>
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