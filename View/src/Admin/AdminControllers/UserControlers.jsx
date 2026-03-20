import axios from "axios";
import React, { createContext, useState } from "react";
import { UserAPI } from "../../Api";
import { toast } from "sonner";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export default function UserControlers({ children }) {
  const [users, setUsers] = useState([]);
  const [role, setrole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userrole = user?.role || "user";
    setrole(userrole);
  }, []);

  async function fetchUser() {
    try {
      const result = await axios.get(`http://localhost:5000/Admin`, {
        withCredentials: true, //  added to include cookies
      });
      setUsers(result.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }

  async function userStateControl(_id, currentstate) {
    try {
      const newstate = !currentstate;
      await axios.patch(
        `http://localhost:5000/Admin/user`,
        { status: newstate, _id: _id },
        { withCredentials: true } //  added here too
      );
      newstate
        ? toast.success("User is unblocked")
        : toast.success("User is blocked");
    } catch (err) {
      console.error("Failed to update user status:", err);
      toast.error("Failed to update user status. Please try again.");
      throw err;
    }
  }

  async function deleteuserDB(userId) {
    console.log("sending to remove user", userId);
    try {
      await axios.delete(`http://localhost:5000/Admin/user`, {
        data: { userId: userId },
        withCredentials: true, // added for cookie auth
      });
      console.log("Deleted user:", userId);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user. Please try again.");
      throw error;
    }
  }

  return (
    <div>
      <UserContext.Provider
        value={{
          userStateControl,
          deleteuserDB,
          users,
          fetchUser,
          role,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
}
