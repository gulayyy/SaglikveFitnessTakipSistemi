import React, { useEffect, useState } from "react";
import useActivityStore from "../store/activityStore";

const ActivityPage = () => {
  const { activities, fetchActivities, createActivity, updateActivity, deleteActivity, loading, error } =
    useActivityStore();
  const [formData, setFormData] = useState({
    activityType: "",
    durationInMinutes: "",
    caloriesBurned: "",
    activityDate: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateActivity(editId, formData);
      setEditMode(false);
      setEditId(null);
    } else {
      await createActivity(formData);
    }
    setFormData({
      activityType: "",
      durationInMinutes: "",
      caloriesBurned: "",
      activityDate: "",
    });
  };

  const handleEdit = (activity) => {
    setEditMode(true);
    setEditId(activity.activityID);
    setFormData({
      activityType: activity.activityType,
      durationInMinutes: activity.durationInMinutes,
      caloriesBurned: activity.caloriesBurned || "",
      activityDate: activity.activityDate.split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    await deleteActivity(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Activities</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="activityType"
          placeholder="Activity Type"
          value={formData.activityType}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="durationInMinutes"
          placeholder="Duration (in minutes)"
          value={formData.durationInMinutes}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="caloriesBurned"
          placeholder="Calories Burned (optional)"
          value={formData.caloriesBurned}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
        />
        <input
          type="date"
          name="activityDate"
          placeholder="Activity Date"
          value={formData.activityDate}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Activity" : "Add Activity"}
        </button>
      </form>

      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.activityID} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{activity.activityType}</h2>
            <p>Duration: {activity.durationInMinutes} minutes</p>
            <p>Calories Burned: {activity.caloriesBurned || "N/A"}</p>
            <p>Date: {new Date(activity.activityDate).toLocaleDateString()}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(activity)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(activity.activityID)}
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

export default ActivityPage;
