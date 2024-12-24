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
  };

  const handleEdit = (tracking) => {
    setEditMode(true);
    setEditId(tracking.sleepID);
    setFormData({
      sleepStart: tracking.sleepStart,
      sleepEnd: tracking.sleepEnd,
    });
  };

  const handleDelete = async (id) => {
    await deleteSleepTracking(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sleep Tracking</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label>Sleep Start:</label>
          <input
            type="datetime-local"
            name="sleepStart"
            value={formData.sleepStart}
            onChange={handleInputChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Sleep End:</label>
          <input
            type="datetime-local"
            name="sleepEnd"
            value={formData.sleepEnd}
            onChange={handleInputChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Sleep Tracking" : "Add Sleep Tracking"}
        </button>
      </form>

      <ul className="space-y-4">
        {sleepTrackings.map((tracking) => (
          <li key={tracking.sleepID} className="p-4 border rounded shadow">
            <p>Sleep Start: {new Date(tracking.sleepStart).toLocaleString()}</p>
            <p>Sleep End: {new Date(tracking.sleepEnd).toLocaleString()}</p>
            <p>Total Sleep Hours: {tracking.totalSleepHours}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(tracking)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tracking.sleepID)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SleepTrackingPage;
