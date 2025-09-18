import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const token = sessionStorage.getItem("token");            
            const headers = {
                "Content-Type": "application/json",
            }

            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                headers: headers,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }

            const result = await response.json();
            if (result) {
                setLoading(false);
                setData(result);
            }
        };

        fetchData()
            .catch((error) => {
                setLoading(false)
                setError(error.message)
            });

    }, [url])

    return { data, loading, error };
}