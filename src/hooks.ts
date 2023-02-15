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

  const fetchUrl = () => {
    if (!url) return;

    setHasError(false);
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
  };

  const refetch = () => {
    fetchUrl();
  };

  useEffect(() => {
    if (!url) return;
    fetchUrl();
  }, [url]);

  return { response, loading, hasError, refetch };
};
