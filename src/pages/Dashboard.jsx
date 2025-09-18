import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../useFetch";

export default function Dashboard() {
    const { userEmail } = useParams();

    const {data, loading, error} = useFetch(`https://backend-workasana.vercel.app/users/${userEmail}`);

    if (error) {
        return <p className="text-center py-4">An error occurred.</p>
    }

    if (loading) {
        return <p className="text-center py-4">Loading...</p>
    }

    return (
        <main className="container ">
            <h2>Dashboard</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>Name: </strong>{data.name}</li>
                <li className="list-group-item"><strong>Email: </strong>{data.email}</li>
            </ul>
        </main>
    );
}