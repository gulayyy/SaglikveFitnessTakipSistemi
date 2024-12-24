import React, { useEffect, useState } from "react";
import useSleepTrackingStore from "../store/sleepTrackingStore";

const SleepTrackingPage = () => {
  const {
    sleepTrackings,
    fetchSleepTrackingsByUser,
    createSleepTracking,
    updateSleepTracking,
    deleteSleepTracking,
    loading,
    error,
  } = useSleepTrackingStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    sleepStart: "",
    sleepEnd: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSleepTrackingsByUser();
  }, [fetchSleepTrackingsByUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sleepStart || !formData.sleepEnd) {
      alert("Please provide both sleep start and end times.");
      return;
    }
    if (editMode) {
      await updateSleepTracking(editId, formData);
      setEditMode(false);
      setEditId(null);
    } else {
      await createSleepTracking(formData);
    }
    setFormData({
      sleepStart: "",
      sleepEnd: "",
    });
    setIsModalOpen(false);
  };

  const handleEdit = (tracking) => {
    setEditMode(true);
    setEditId(tracking.sleepID);
    setFormData({
      sleepStart: tracking.sleepStart,
      sleepEnd: tracking.sleepEnd,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteSleepTracking(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        Sleep Tracking
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Add Sleep Tracking Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition"
      >
        + Add Sleep Tracking
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              {editMode ? "Edit Sleep Tracking" : "Add Sleep Tracking"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Sleep Start:</label>
                <input
                  type="datetime-local"
                  name="sleepStart"
                  value={formData.sleepStart}
                  onChange={handleInputChange}
                  className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Sleep End:</label>
                <input
                  type="datetime-local"
                  name="sleepEnd"
                  value={formData.sleepEnd}
                  onChange={handleInputChange}
                  className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  required
                />
              </div>
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
                  {editMode ? "Update Sleep Tracking" : "Add Sleep Tracking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sleep Trackings List */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sleepTrackings.map((tracking) => (
          <div
            key={tracking.sleepID}
            className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <strong>Sleep Start:</strong> {new Date(tracking.sleepStart).toLocaleString()}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <strong>Sleep End:</strong> {new Date(tracking.sleepEnd).toLocaleString()}
            </p>
            <p className="text-gray-700">
              <strong>Total Sleep Hours:</strong> {tracking.totalSleepHours}
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => handleDelete(tracking.sleepID)}
                className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepTrackingPage;
