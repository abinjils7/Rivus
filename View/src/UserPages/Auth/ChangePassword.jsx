import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../ContextAPI/Authcontext";
import { toast } from "sonner";

function ChangePassword() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const { changePassword } = useContext(AuthContext);

  const [current, setcurrent] = useState("");
  const [newpass, setnewpass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Async handler for form submit
  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload
    try {
      await changePassword(current, newpass, email);
      // toast is shown inside changePassword on success
      navigate("/login");
    } catch (err) {
      // error toast is already handled in changePassword
    }
  };

  return (
    <>
      <h1 className="ml-10 text-4xl">
        <b>RIVUS</b>Cars<span className="text-xs">tm</span>
      </h1>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full bg-white">
          <h2 className="text-center text-6xl font-bold text-gray-900">
            Change Password
          </h2>
          <p className="mt-1 text-center text-gray-500">
            Update your password to keep your account secure.
          </p>

          <form className="mt-6 space-y-5" onSubmit={handlesubmit}>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Current Password */}
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                placeholder="Enter current password"
                className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none border-gray-300"
                value={current}
                onChange={(e) => setcurrent(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-400"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
              >
                {showPassword.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                placeholder="Enter new password"
                className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none border-gray-300"
                value={newpass}
                onChange={(e) => setnewpass(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-400"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
              >
                {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Update Password
            </button>

            {/* Back to login */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Want to go back?{" "}
              <Link
                to="/login"
                className="font-medium text-black hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
