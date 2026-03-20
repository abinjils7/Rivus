import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import AuthContext from "../../ContextAPI/Authcontext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    status: true,
    role: "user",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim("No leading or trailing spaces")
        .strict(true)
        .matches(/^(?!\s*$).+$/, "Name cannot be empty or spaces only")
        .required("Name is required"),
      email: Yup.string()
        .trim("No leading or trailing spaces")
        .strict(true)
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .trim("No leading or trailing spaces")
        .strict(true)
        .matches(/^(?!\s*$).+$/, "Password cannot be empty or spaces only")
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        status: true,
        role: "user",
      };

      
      register(newUser);
      navigate("/login");
    },
  });

  return (
    <>
      <h1 className="ml-10 mt-6 text-4xl">
        <b>RIVUS</b>Cars<span className="text-xs">TM</span>
      </h1>

      <div className="flex items-center justify-center min-h-screen bg-white px-4">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col"
        >
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Fill in your details to register.
          </p>

          <input
            type="text"
            name="name"
            placeholder="Name"
            {...formik.getFieldProps("name")}
            className={`mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              formik.touched.name && formik.errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-black focus:border-black"
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.name}
            </div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className={`mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-black focus:border-black"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.email}
            </div>
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            className={`mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-black focus:border-black"
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.password}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="bg-black hover:bg-gray-800 transition-colors text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register
          </button>

          {/* Already have account link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-black hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
