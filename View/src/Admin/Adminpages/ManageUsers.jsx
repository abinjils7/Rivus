import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../AdminControllers/UserControlers";

export default function ManageUsers() {
  const { userStateControl, deleteuserDB, users, fetchUser } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const usersRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchUser().finally(() => {
      setLoading(false);
      // Smooth scroll to users after loading
      setTimeout(() => {
        scrollToUsers();
      }, 300);
    });
  }, []);

  const scrollToUsers = () => {
    if (usersRef.current) {
      usersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-sm mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
          User Management
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Manage user accounts, block/unblock users, and remove accounts when
          necessary.
        </p>
        <button
          onClick={scrollToUsers}
          className="px-6 py-3 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          View Users
        </button>
      </div>

      {/* Users Section with ref for scrolling */}
      <div ref={usersRef} className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          All Users ({users.length > 0 ? users.length - 1 : 0})
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">Scroll to explore</span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gray-50 rounded-2xl shadow-sm overflow-hidden border border-gray-100 p-5"
              >
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-9 bg-gray-200 rounded mb-3"></div>
                <div className="h-9 bg-gray-200 rounded"></div>
              </div>
            ))}
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl shadow-sm">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p className="text-gray-500 text-xl">No users found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.slice(1).map((u, index) => (
            <div
              key={u.id}
              className="border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 bg-white transform hover:-translate-y-1 opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 80}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <p className="mb-2 text-sm text-gray-500">
                <strong>User ID:</strong> {u.id}
              </p>
              <p className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1">
                {u.name}
              </p>
              <p className="mb-4 text-sm text-gray-600 line-clamp-1">
                {u.email}
              </p>

              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  u.status
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {u.status ? "Active" : "Blocked"}
              </div>

              <div className="space-y-3">
                {u.status ? (
                  <button
                    className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm"
                    onClick={() => userStateControl(u._id, true)}
                  >
                    Block User
                  </button>
                ) : (
                  <button
                    className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm"
                    onClick={() => userStateControl(u._id,false)}
                  >
                    Unblock User
                  </button>
                )}

                <button
                  className="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                  onClick={() => deleteuserDB(u._id)}
                >
                  Remove User
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to top button */}
      {!loading && users.length > 3 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 z-10"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          transform: translateY(20px);
          animation: fadeIn 0.6s ease forwards;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
