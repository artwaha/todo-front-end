import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const userService = require("../services/user-service");

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await userService.login(formData.email, formData.password);
    // console.log("Length: ", Object.keys(response).length);
    // console.log(response);
    if (Object.keys(response).length !== 3) {
      setErrorMessage("Invalid Email of Password");
    } else {
      console.log(response);
      setErrorMessage("");
      // : navigate("/tasks");
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
              Sign in
            </h1>

            <p className="text-gray-500">Sign in to access your Tasks</p>
          </div>

          <div className="m-7">
            <form onSubmit={handleLogin}>
              {errorMessage && (
                <p className="mb-2 text-sm text-center text-red-600">
                  {errorMessage}
                </p>
              )}
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
                  id="email"
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600">
                    Password
                  </label>

                  <a
                    href="#!"
                    className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  to="register"
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500"
                >
                  Sign up
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
