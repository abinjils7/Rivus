import React, { Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../UserPages/Auth/Register";
import Login from "../UserPages/Auth/Login";
import Home1 from "../UserPages/User/Home1";
import Allterrains from "../UserPages/User/Allterrains";
import LexuryLines from "../UserPages/User/LexuryLines";
import TestDrive from "../UserPages/User/TestDrive";
import About from "../UserPages/User/About";
import Cart from "../UserPages/User/Cart";
import Orderpage from "../UserPages/User/Orderpage";
import MyOrders from "../UserPages/User/MyOrders";
import Tracs from "../UserPages/User/Tracs";
import Luxs from "../UserPages/User/Luxs";
import LoadingSpinner from "../UserPages/Common/Loadingspinner";
import WishlistPage from "../UserPages/User/Wishlist";
// import { useAuth } from "../ContextAPI/Authcontext";
import AdminDashboard from "../Admin/Adminpages/AdminDashboard";
import AddProducts from "../Admin/Adminpages/AddProducts";
import ManageProduct from "../Admin/Adminpages/ManageProduct";
import ViewordersHistory from "../Admin/Adminpages/ViewordersHistory";
import ManageUsers from "../Admin/Adminpages/ManageUsers";
import ProtectedRoute from "./ProtectedRoute";

import AuthContext from "../ContextAPI/Authcontext";
import ChangePassword from "../UserPages/Auth/ChangePassword";
import UserProfile from "../UserPages/User/Userprofile";

const Productlist = React.lazy(() => import("../UserPages/User/Productlist"));

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home1 />} />
      {user === null && (
        <>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </>
      )}
      <Route
        path="/marketplace"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <Productlist />
          </Suspense>
        }
      />
      {/* <Route
        path="/cars"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <Productlist />
          </Suspense>
        }
      /> */}
      <Route path="/Allterains" element={<Allterrains />} />
      <Route path="/colections" element={<LexuryLines />} />
      <Route path="/trackspec" element={<Tracs />} />
      <Route path="/premium-luxury" element={<Luxs />} />
      <Route path="/testdrive" element={<TestDrive />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute userOnly={true}>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute userOnly={true}>
            <Cart />
            //{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/orderpage"
        element={
          <ProtectedRoute>
            <Orderpage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ordhistory"
        element={
          <ProtectedRoute userOnly={true}>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute userOnly={true}>
            <WishlistPage />
          </ProtectedRoute>
        }
      />
      ------------------------ADMIN---------------------------
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Addproducts"
        element={
          <ProtectedRoute adminOnly={true}>
            <AddProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manageproducts"
        element={
          <ProtectedRoute adminOnly={true}>
            <ManageProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ViewordersHistory"
        element={
          <ProtectedRoute adminOnly={true}>
            <ViewordersHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Manageusers"
        element={
          <ProtectedRoute adminOnly={true}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
