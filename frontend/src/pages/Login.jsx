import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sportImage from '../assets/sport.jpg'; // Görseli düzgün import et
import useAuthStore from "../store/authStore"; // Auth store importu


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Email ve şifre gereklidir.");
      return;
    }
  
    try {
      const data = await useAuthStore.getState().loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "An error occurred during login. Please try again.");
    }
  };
  
  

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800">
      {/* Background Image */}
      <img
        src={sportImage}
        alt="Fitness Background"
        className="absolute inset-0 object-cover w-full h-full opacity-80"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-transparent" />

      {/* Login Card */}
      <div className="relative bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-3">eFITNESS</h1>
          <p className="text-sm sm:text-lg text-gray-600">Your ultimate gym management platform</p>
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-700 text-white py-3 rounded-xl shadow-lg font-bold text-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-white transition duration-300"
          >
            Log in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={navigateToRegister}
            className="text-indigo-500 underline hover:text-indigo-600 font-medium"
          >
            Register now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
