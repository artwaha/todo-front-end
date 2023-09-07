import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const userService = require("../services/user-service");

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const response = await userService.register(
      formData.name,
      formData.email,
      formData.password
    );
    if (Object.keys(response).length !== 3) {
      setErrorMessage("Unable to register user");
    } else {
      navigate("/tasks");
      setErrorMessage("");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <div className="flex items-center min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">
              Register
            </h1>

            <p className="text-gray-500">Create an account to get started</p>
          </div>

          <div className="m-7">
            <form onSubmit={handleRegister}>
              {errorMessage && (
                <p className="mb-2 text-sm text-center text-red-600">
                  {errorMessage}
                </p>
              )}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Name
                </label>

                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  placeholder="Your full name"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  onChange={handleChange}
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Register
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500"
                >
                  Login
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
