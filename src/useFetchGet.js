import { useEffect, useState } from "react";

export function useFetchGet(url) {
    const [data, setData] = useState(null);

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
                setData(result);
            }
        };

        fetchData()
    }, [url]);

    return { data };
}