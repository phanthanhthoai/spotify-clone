import {useEffect, useState} from "react";
import axios from "axios";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                if (isMounted) {
                    setData(response.data);
                    setError(null);
                    setMessage(null)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.error);
                    setMessage(err.message())
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        }
    }, [url]);

    return {
        data, loading, error, message
    }
}