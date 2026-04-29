import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { toast } from "sonner";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setloading(false);
  }, []);

  const register = async (newUser) => {
    try {
      const res = await axios.post(`${BASE_URL}/Register`, newUser, {
        withCredentials: true, //  added
      });
      setUser(res.data);
      toast.success("Registered successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  const login1 = async (email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true } //  added
      );
      const { user: loggedInUser } = res.data;
      if (loggedInUser && loggedInUser.status === "inactive") {
        toast.error("Your account is inactive. Contact admin.");
        return null;
      }
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      toast.success("Logged in successfully!");
      return loggedInUser;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid email or password");
      return null;
    }
  };

    setUser(null);
    localStorage.removeItem("user");
    toast.info("Logged out!");
    navigate("/");
  };

  const changePassword = async (currentpassword, newpassword, email) => {
    try {
      console.log(
        "data receved for changepasswor",
        currentpassword,
        newpassword,
        email
      );
      const response = await axios.patch(
        `${BASE_URL}/changepassword`,
        { currentpassword, newpassword, email },
        { withCredentials: true } //  added
      );

      toast.success("Password updated");
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid email or password");
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login1, logout, changePassword, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
