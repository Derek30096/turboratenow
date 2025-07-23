import { useState, useEffect } from "react";

const DASHBOARD_PASSWORD = "TrackX$9K2mP7!"; // Obscured secure password
const AUTH_KEY = "dashboard_authenticated";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = sessionStorage.getItem(AUTH_KEY);
    setIsAuthenticated(authStatus === "true");
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}