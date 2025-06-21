import { useState } from "react";
import { axiosInstance } from "../api/axiosinstance";
import { useNavigate } from "react-router-dom";

export const Login = () => {
   const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/auth/google";
  };
    const nav=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("just print")
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login success:", res.data);

      nav("/AdminPage")
      
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Login to EPLQ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-md mt-4"
          >
            Login
          </button>
        </form>
         <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
          <span className="mx-3 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-white  text-black font-semibold py-2 rounded-md gap-2"
        >
      
         <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
          Continue with Google
        </button>
      </div>
    </div>
  );
};
