import { ACCESS_TOKEN_NAME } from "@env";

import { getToken } from "../utils/tokenManager";
import { makeRequest } from "../utils/makeRequest";
import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any[] | any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = await getToken(ACCESS_TOKEN_NAME);
      try {
        const response = await makeRequest({
          method: "get",
          maxBodyLength: Infinity,
          url,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response?.success) {
          throw new Error(`HTTP error! status: ${response?.status}`);
        }
        setData(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
