import { useState, useEffect } from 'react';
import axios from 'src/lib/axios';

export default function useFetch<DataType>(
  url: string
): [DataType | null, boolean, string | null] {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setData(null);
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${url}?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setData(response.data);
        setLoading(false);
      } catch (_error: any) {
        setError(_error);
      }
    })();
  }, [url]);

  return [data, loading, error];
}
