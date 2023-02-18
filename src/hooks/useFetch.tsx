import { useState, useEffect, useMemo } from 'react';
import axios from 'src/lib/axios';

export default function useFetch<DataType>(
  url: string,
  urlParams?: any
): [DataType | null, boolean, string | null] {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const urlPramWithApiKey = useMemo(
    () => ({
      ...urlParams,
      api_key: import.meta.env.VITE_API_KEY,
    }),
    [urlParams]
  );

  const urlParamsString = useMemo(
    () =>
      Object.keys(urlPramWithApiKey)
        .map((key) => `${key}=${urlPramWithApiKey[key]}`)
        .join('&'),
    [urlPramWithApiKey]
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${url}?${urlParamsString}`);
        setData(response.data);
        setLoading(false);
      } catch (_error: any) {
        setError(_error);
      }
    })();

    return () => {
      setData(null);
      setLoading(true);
      setError(null);
    };
  }, [url, urlParamsString]);

  return [data, loading, error];
}
