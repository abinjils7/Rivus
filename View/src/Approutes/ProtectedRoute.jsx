import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../UserPages/Common/Loadingspinner";
import AuthContext from "../ContextAPI/Authcontext";
import { toast } from "sonner";

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  // 1. Still loading user → no redirect, no toast
  if (loading) return <LoadingSpinner />;

  // 2. No user → now show toast because loading is finished
  if (!user) {
    toast.info("Please login first");
    return <Navigate to="/" replace />;
  }

  // 3. Admin-only routes
  if (adminOnly && user.role !== "admin") {
    toast.error("Admin access only");
    return <Navigate to="/" replace />;
  }

  // 4. User-only routes (block admin)
  if (userOnly && user.role !== "user") {
    toast.error("Users only area");
    return <Navigate to="/admin" replace />;
  }

  // 5. All good → render
  return children;
};

export default ProtectedRoute;
