import { useEffect, useState } from "react";

const defaultOptions = {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
};

export const useFetch = <T>(url: string | null, opts?: any) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    fetch(url, { ...defaultOptions, ...opts })
      .then((data) => data.json())
      .then((data) => {
        setResponse(data);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
  }, [url]);

  return { response, loading, hasError };
};
