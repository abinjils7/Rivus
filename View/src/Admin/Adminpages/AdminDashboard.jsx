import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Target,
  LogOut,
  ChevronRight,
  UserPlus,
  DollarSign,
  Package2,
} from "lucide-react";
import { Card, CardContent } from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../ContextAPI/Authcontext";
import { UserContext } from "../AdminControllers/UserControlers";
import CarContext from "../../ContextAPI/Carcontext";

export default function AdminDashboard() {
  const [user, setUser] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [order, setOrder] = useState([]);
  const { cars } = useContext(CarContext);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, ordersRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}//Admin`),
          axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}//Admin/order`),
        ]);

        setUser(usersRes.data);

        const revenue = ordersRes.data.reduce(
          (sum, order) => sum + order.totalPrice,
          0
        );
        setTotalRevenue(revenue);
        setOrder(ordersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white border-r border-gray-100 p-6 shadow-sm flex flex-col fixed left-0 top-0 bottom-0 z-10">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800 tracking-wider">
            <span className="text-3xl text-black">RIVUS</span>
            <span className="block text-sm text-gray-500 mt-1">
              ADMIN PANEL
            </span>
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          <Link
            to="/manageproducts"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group font-medium"
          >
            <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Package size={18} className="text-blue-600" />
            </div>
            <span>Manage Products</span>
            <ChevronRight
              size={16}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
          <Link
            to="/manageusers"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group font-medium"
          >
            <div className="p-1.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
              <Users size={18} className="text-green-600" />
            </div>
            <span>Manage Users</span>
            <ChevronRight
              size={16}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
          <Link
            to="/ViewordersHistory"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group font-medium"
          >
            <div className="p-1.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
              <ShoppingCart size={18} className="text-purple-600" />
            </div>
            <span>Orders</span>
            <ChevronRight
              size={16}
              className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
        </nav>

        <div className="pt-6 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group font-medium"
          >
            <div className="p-1.5 bg-red-50 rounded-lg">
              <LogOut size={18} className="text-red-500" />
            </div>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <div className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0 flex items-start justify-between">
              <div>
                <h2 className="text-gray-500 text-xs uppercase mb-2 font-medium tracking-wider">
                  Total Users
                </h2>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    {user.length}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">Registered users</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users size={22} className="text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0 flex items-start justify-between">
              <div>
                <h2 className="text-gray-500 text-xs uppercase mb-2 font-medium tracking-wider">
                  Total Stock
                </h2>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    {cars.length}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">Available products</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl">
                <Package2 size={22} className="text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0 flex items-start justify-between">
              <div>
                <h2 className="text-gray-500 text-xs uppercase mb-2 font-medium tracking-wider">
                  Revenue
                </h2>
                {loading ? (
                  <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    ${totalRevenue.toLocaleString()}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">Total earnings</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign size={22} className="text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0 flex items-start justify-between">
              <div>
                <h2 className="text-gray-500 text-xs uppercase mb-2 font-medium tracking-wider">
                  Orders
                </h2>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse"></div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    {order.length}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">Total orders</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <ShoppingCart size={22} className="text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* New Users Card */}
          <Card className="rounded-xl bg-white border border-gray-100 p-5 h-[400px] shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="h-full flex flex-col p-0">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-gray-800 text-lg font-semibold flex items-center gap-2">
                  <UserPlus size={20} className="text-blue-500" />
                  Recent Users
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {user.length} total
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {loading
                  ? Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 px-2 rounded-md border-b border-gray-100 last:border-b-0"
                        >
                          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        </div>
                      ))
                  : user.slice(1).map((u, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 px-2 rounded-md hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                      >
                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {u.name}
                        </span>
                        <span className="text-sm text-gray-500 truncate max-w-[160px]">
                          {u.email}
                        </span>
                      </div>
                    ))}
              </div>
            </CardContent>
          </Card>

          {/* New Orders Card */}
          <Card className="rounded-xl bg-white border border-gray-100 p-5 h-[400px] shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="h-full flex flex-col p-0">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-gray-800 text-lg font-semibold flex items-center gap-2">
                  <ShoppingCart size={20} className="text-purple-500" />
                  Recent Orders
                </h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {order.length} total
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {loading
                  ? Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 px-2 rounded-md border-b border-gray-100 last:border-b-0"
                        >
                          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/5 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                        </div>
                      ))
                  : order.map((u, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 px-2 rounded-md hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                      >
                        <span className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                          #{u._id}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            u.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : u.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {u.status}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          ${u.totalPrice}
                        </span>
                      </div>
                    ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c5c5c5;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
        `}</style>
      </main>
    </div>
  );
}
