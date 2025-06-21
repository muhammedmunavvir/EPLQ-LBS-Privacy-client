import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosinstance";

export const AdminPage = () => {
  const [formData, setFormData] = useState({
    locationName: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  const [userPicture, setUserPicture] = useState(null);
  console.log(userPicture,"above")
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { locationName, latitude, longitude, description } = formData;

    if (!locationName || !latitude || !longitude || !description) {
      setError("Please fill in all fields.");
      return;
    }

    setSuccess("Location uploaded successfully!");
    setFormData({
      locationName: "",
      latitude: "",
      longitude: "",
      description: "",
    });
  };

  const getUserProfile = async () => {
    try {
      const res = await axiosInstance.get("/user/profile", {
        withCredentials: true,
      });
      console.log(res.data.picture,"hello")
      setUserPicture(res.data.picture);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start px-4 py-8">
      {/* Profile Picture */}
      {userPicture && (
        <div className="flex justify-center mb-4">
      <img
        src={userPicture}
        alt="User Profile"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/96";
        }}
        className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg object-cover"
      />
    </div>
      )}

      {/* Admin Form Card */}
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          Admin - Upload Location
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Location Name
            </label>
            <input
              type="text"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-purple-500 resize-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          {success && (
            <p className="text-green-400 text-center text-sm">{success}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
          >
            Upload Location
          </button>
        </form>
      </div>
    </div>
  );
};
