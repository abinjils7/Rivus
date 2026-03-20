import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../ContextAPI/Authcontext";
// import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const { login1 } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const isAdmin = localStorage.getItem("user");
  //   if (isAdmin.role === "admin") {
  //     navigate("/admin");
  //   }
  // }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim("No leading or trailing spaces")
      .strict(true)
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .trim("No leading or trailing spaces")
      .strict(true)
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await login1(values.email, values.password); // wait for login

        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        if (loggedInUser?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Login error:", error);
        formik.setFieldError("email", "Invalid email or password");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <h1 className="ml-10 text-4xl">
        <b>RIVUS</b>Cars<span className="text-xs">tm</span>
      </h1>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full bg-white">
          <h2 className="text-center text-6xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-1 text-center text-gray-500">
            Enter your username and password to continue.
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-5">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black focus:border-black"
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black focus:border-black"
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isLoading || !formik.isValid}
              className="w-full flex justify-center py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-black hover:underline"
              >
                Register
              </Link>
            </p>

            <p className="mt-6 text-center text-sm text-gray-500">
              chnage password?{" "}
              <Link
                to="/changepassword"
                className="font-medium text-black hover:underline"
              >
                chnage password
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
