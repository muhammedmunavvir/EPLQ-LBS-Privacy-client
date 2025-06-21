import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl bg-gray-800 rounded-xl shadow-lg p-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4 text-purple-400">Welcome to EPLQ</h1>
        <p className="text-gray-300 mb-6">
          Efficient and Privacy-preserving Location-based Query system.
        </p>

        <div className="space-x-4">
          <Link
            to="/register"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
