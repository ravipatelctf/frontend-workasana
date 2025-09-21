import { useState } from "react";

export function useFetchPost(url) {
    const [data, setData] = useState(null);

    async function fetchData(JSONPayload) {
        if (JSONPayload === null) {
            return;
        }
        const token = sessionStorage.getItem("token");            
        const headers = {
            "Content-Type": "application/json",
        }

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(JSONPayload)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        const result = await response.json();
        if (result) {
            setData(result);
        }
    };

    return { data, fetchData };
}