import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/userApi";
import { loginBody } from "../service/requestBody";
import Navbar from "./NavBar";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    const response = await login(loginBody(formData));

    if (response.status === 200) {
      localStorage.setItem("token", response.data.data.token);
      setMessage("");
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setMessage(response.data.message);
      setSuccess(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">LOGIN</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          {message && (
            <div className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-md max-w-xs text-center">
              {message}
            </div>
          )}

          {success && (
            <div className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-md max-w-xs text-center">
              Login successfully!
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
