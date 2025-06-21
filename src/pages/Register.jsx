import { useState } from "react";
import { axiosInstance } from "../api/axiosinstance";
import { useNavigate } from "react-router-dom";
export const Register = () => {

  const nav=useNavigate()

     const handleGoogleSignup = () => {
    window.open("http://localhost:5001/auth/google", "_self");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("hellow");
    e.preventDefault(); // ✅ First stop form reload

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // ✅ Clear error if any

    try {
      const res = await axiosInstance.post("/user", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Success response:", res.data);
      nav("/login")
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setError("Registration failed. Try again.");
    }

   
  };


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Register for EPLQ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              User Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:ring-2 focus:ring-purple-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:ring-2 focus:ring-purple-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:ring-2 focus:ring-purple-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="mt-1 w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md focus:ring-2 focus:ring-purple-500"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-md mt-4"
          >
            Sign up
          </button>
          <p className="text-center text-gray-400">or</p>
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full bg-white text-gray-900 font-semibold py-2 rounded-md mt-2 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <p className="text-sm text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
