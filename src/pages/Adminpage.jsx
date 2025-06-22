import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosinstance";


export const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Hospital",
    address: "",
    latitude: "",
    longitude: "",
  });

  const [userPicture, setUserPicture] = useState(null);
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

  const { name, type, address, latitude, longitude } = formData;

  if (!name || !type || !address || !latitude || !longitude) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    await axiosInstance.post(
      "/location/add",
      {
        name,
        type,
        address,
        latitude: latitude,
        longitude: longitude,
      },
      { withCredentials: true }
    );

    setSuccess("Location uploaded successfully!");
    setFormData({
      name: "",
      type: "Hospital",
      address: "",
      latitude: "",
      longitude: "",
    });
  } catch (err) {
    console.error(err);
    setError("Something went wrong.");
  }
};

  const getUserProfile = async () => {
    try {
      const res = await axiosInstance.get("/user/profile", {
        withCredentials: true,
      });
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
      {userPicture && (
        <div className="flex justify-center mb-4">
          <img
            src={userPicture}
            alt="User Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://www.gravatar.com/avatar/?d=mp&s=96";
            }}
            className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg object-cover"
          />
        </div>
      )}

      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          Admin - Add Place
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full bg-gray-700 border border-gray-600 p-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 w-full bg-gray-700 border border-gray-600 p-2 rounded-md"
              required
            >
              <option value="Hospital">Hospital</option>
              <option value="School">School</option>
              <option value="Police Station">Police Station</option>
              <option value="Fire Station">Fire Station</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full bg-gray-700 border border-gray-600 p-2 rounded-md resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300">Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="mt-1 w-full bg-gray-700 border border-gray-600 p-2 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="mt-1 w-full bg-gray-700 border border-gray-600 p-2 rounded-md"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-md font-semibold"
          >
            Upload Place
          </button>
        </form>
      </div>
    </div>
  );
};
