import React, { useEffect, useState } from "react";
import Api from "./axiosconfig";
import { decryptedSessionId } from "./cryptconfig";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      try {
        const sessionId = sessionStorage.getItem('session_id');
        const session_key = decryptedSessionId(sessionId)


        const response = await Api.get('/auth/status', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Session-ID': session_key,
          },
        });

        setIsAuthenticated(response.data.authentication);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAuthenticationStatus();
  }, []);

  return isAuthenticated ? <Component {...rest} /> : <p>Unauthorized</p>;
};

export default ProtectedRoute;
