import React, { useState, useEffect } from "react";
import Preloader from "./partial/Preloader";
import Sidebar from "./partial/Sidebar";
import Header from "./partial/Header";
import { getUsersById, editUser } from "./api";
import { useParams, useNavigate } from "react-router-dom";

const EditUsers = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [name, setName] = useState("");
  const [kelamin, setKelamin] = useState("");
  const [mapel, setMapel] = useState("");
  const [image, setImage] = useState(""); // Used for image URL (If provided manually)
  const [imageFile, setImageFile] = useState(null); // File upload state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user data based on ID
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getUsersById(id);
        if (response.user && response.user.length > 0) {
          setUsers(response.user[0]);
          setName(response.user[0].name);
          setKelamin(response.user[0].kelamin);
          setMapel(response.user[0].mapel);
          setImage(response.user[0].image);
        } else {
          setError("User not found.");
        }
      } catch (error) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { name, kelamin, mapel, image };

    setLoading(true);
    try {
      // Call the editUser function with FormData, including image file if exists
      await editUser(id, updatedUser, imageFile);
      navigate("/users"); // Navigate back to users list after editing
    } catch (error) {
      setError("Failed to update user data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImageFile(file); // Store the selected image file
      setImage(URL.createObjectURL(file)); // Set image preview in the input
    }
  };

  return (
    <div>
      <Preloader />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-gray-200">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Edit User
              </h1>

              {/* Error Handling */}
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {/* Loading or Form */}
              {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
              ) : (
                users && (
                  <div className="bg-white p-8 rounded shadow-lg max-w-lg mx-auto">
                    <form onSubmit={handleSubmit}>
                      {/* Name Input */}
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-600 mb-2"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Gender Input */}
                      <div className="mb-4">
                        <label
                          htmlFor="kelamin"
                          className="block text-sm font-medium text-gray-600 mb-2"
                        >
                          Gender
                        </label>
                        <select
                          id="kelamin"
                          value={kelamin}
                          onChange={(e) => setKelamin(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      {/* Subject Input */}
                      <div className="mb-4">
                        <label
                          htmlFor="mapel"
                          className="block text-sm font-medium text-gray-600 mb-2"
                        >
                          Subject
                        </label>
                        <input
                          id="mapel"
                          type="text"
                          placeholder="Enter Subject"
                          value={mapel}
                          onChange={(e) => setMapel(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Image File Input */}
                      <div className="mb-4">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-600 mb-2"
                        >
                          Upload Image
                        </label>
                        <input
                          id="image"
                          type="file"
                          onChange={handleImageChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Update Button */}
                      <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update User"}
                      </button>
                    </form>
                  </div>
                )
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EditUsers;
