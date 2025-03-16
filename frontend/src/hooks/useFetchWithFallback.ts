import { useState, useEffect } from 'react';


export function useFetchWithFallback<T>(fetchData: () => Promise<T>, fallbackData: T) {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Showing dummy data.');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [fetchData]);

  return { data, loading, error };
}
