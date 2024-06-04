import { REFRESH_TOKEN_NAME } from "@env";

import { getToken } from "../utils/tokenManager";
import { makeRequest } from "../utils/makeRequest";
import { useState, useEffect } from "react";

export const useLogout = (url: string) => {
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const logoutUser = async () => {
      setIsLoading(true);
      const token = await getToken(REFRESH_TOKEN_NAME);
      try {
        const response = await makeRequest({
          method: "post",
          maxBodyLength: Infinity,
          url,
          data : JSON.stringify({
            refreshToken : token
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response?.success) {
          throw new Error(`HTTP error! status: ${response?.status}`);
        }
        setIsLogout(true);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    logoutUser();
  }, []);

  return { isLogout, isLoading, error };
};
