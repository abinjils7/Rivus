import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.name) {
      toast.info(`Welcome, ${user.name}!`, {
        position: "top-center",
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Account Overview
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your profile and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              {/* User Avatar & Basic Info */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center text-white text-2xl font-bold uppercase shadow-lg">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {user?.name}
                </h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium mt-2">
                  {/* <div className="w-2 h-2 bg-green-500 rounded-full"></div> */}
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2">
                <NavItem
                  active
                  icon="👤"
                  label="Profile Overview"
                  link="/profile"
                />
                <NavItem icon="📦" label="Order History" link="/ordhistory" />
                <NavItem icon="❤️" label="Wishlist" link="/wishlist" />
              </nav>

              {/* Support Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Need help? Contact{" "}
                  <span className="font-semibold text-black cursor-pointer hover:underline">
                    support
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {/* Welcome Section */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name}!
                  </h2>
                  <p className="text-gray-600">
                    Here's your profile information and account details.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                  <span className="text-2xl">👋</span>
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <ProfileCard
                  icon="📧"
                  label="Email Address"
                  value={user?.email}
                  description="Your primary email for communications"
                />
                <ProfileCard
                  icon="🆔"
                  label="User ID"
                  value={user?.id || user?._id}
                  description="Your unique identifier"
                />
              </div>

              {/* Additional Info Section */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>ℹ️</span>
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <InfoItem label="Member Since" value="January 2024" />
                  <InfoItem label="Last Login" value="2 hours ago" />
                  <InfoItem label="Account Type" value="Standard" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                    Change Password
                  </button>
                  <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                    Privacy Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Navigation Item Component - FIXED: Now uses Link component
function NavItem({ icon, label, link, active = false }) {
  return (
    <Link
      to={link}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
        active
          ? "bg-black text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

// Profile Card Component
function ProfileCard({ icon, label, value, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">{icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
        <p className="text-gray-800 font-medium break-all">{value}</p>
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-gray-600 font-medium">{label}</p>
      <p className="text-gray-900 font-semibold">{value}</p>
    </div>
  );
}

export default UserProfile;
