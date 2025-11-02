import { useCallback, useEffect, useState } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setError(null);
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(timeOutId);
    }, [fetchData]);

    return { data, error, isLoading, fetchData };
};

export default useFetch;
