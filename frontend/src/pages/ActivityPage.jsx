import React, { useEffect, useState } from "react";
import useActivityStore from "../store/activityStore";

const ActivityPage = () => {
  const {
    activities,
    fetchActivities,
    createActivity,
    deleteActivity,
    loading,
    error,
  } = useActivityStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    activityType: "",
    durationInMinutes: "",
    caloriesBurned: "",
    activityDate: "",
  });

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createActivity(formData);
    setIsModalOpen(false);
    setFormData({
      activityType: "",
      durationInMinutes: "",
      caloriesBurned: "",
      activityDate: "",
    });
  };

  const handleDelete = async (id) => {
    await deleteActivity(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        Your Activities
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Add Activity Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition"
      >
        + Add Activity
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              Add New Activity
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="activityType"
                placeholder="Activity Type"
                value={formData.activityType}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
              <input
                type="number"
                name="durationInMinutes"
                placeholder="Duration (in minutes)"
                value={formData.durationInMinutes}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
              <input
                type="number"
                name="caloriesBurned"
                placeholder="Calories Burned (optional)"
                value={formData.caloriesBurned}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
              />
              <input
                type="date"
                name="activityDate"
                value={formData.activityDate}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activities List */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <div
            key={activity.activityID}
            className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-800">
                {activity.activityType}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(activity.activityDate).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Duration:</strong> {activity.durationInMinutes} minutes
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Calories Burned:</strong> {activity.caloriesBurned || "N/A"}
            </p>
            <button
              onClick={() => handleDelete(activity.activityID)}
              className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPage;
