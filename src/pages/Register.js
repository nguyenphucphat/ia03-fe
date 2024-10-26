import React, { useState } from "react";
import { registerBody } from "../service/requestBody";
import { register } from "../service/userApi";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");

    if (
      !formData.username ||
      !formData.email ||
      !formData.name ||
      !formData.password
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(formData.password)) {
      setMessage(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character."
      );
      return;
    }

    const response = await register(registerBody(formData));

    if (response.status === 201) {
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
      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-md mx-auto mt-20 bg-white rounded-md shadow-md md:mt-32 lg:mt-40 lg:px-8 lg:py-10"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">REGISTER</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

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

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>

        {message && (
          <div className="fixed bottom-5 right-5 bg-red-500 text-white p-3 rounded-md max-w-xs text-center">
            {message}
          </div>
        )}

        {success && (
          <div className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-md max-w-xs text-center">
            Registered successfully!
          </div>
        )}
      </form>
    </>
  );
};

export default Register;
