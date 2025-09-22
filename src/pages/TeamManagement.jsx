

import PageLayout from "./PageLayout";
import { baseUrl } from "../api";
import { useFetchGet } from "../useFetchGet";

export default function TeamManagement() {

    const {data} = useFetchGet(`${baseUrl}/teams`);

    return (
        <div>
            <PageLayout>
                <main>
                    <h2 className="text-center fw-bold">Team Management</h2>
                    <ul className="list-group">
                        {
                            data ? (data.map((team) => (
                                <li key={team._id} className="list-group-item">
                                    <h5 className="fw-bold">{team.name}</h5>
                                    <p><strong>Description: </strong>{team.description}</p>
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