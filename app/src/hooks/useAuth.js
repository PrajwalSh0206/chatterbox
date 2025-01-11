// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import authService from "../services/authService";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const userData = await authService.login(credentials);
      localStorage.setItem("token", userData.token); // Save token
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (credentials) => {
    try {
      const userData = await authService.signUp(credentials);
      localStorage.setItem("token", userData.token); // Save token
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem("token"); // Remove token
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser({ username: userData.username });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, login, signUp, logout };
};

export default useAuth;
