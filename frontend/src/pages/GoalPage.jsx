import React, { useEffect, useState } from "react";
import useGoalStore from "../store/goalStore";

const GoalPage = () => {
  const { goals, fetchGoals, createGoal, updateGoal, deleteGoal, loading, error } = useGoalStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    goalName: "",
    targetValue: "",
    currentValue: "",
    goalStartDate: "",
    goalEndDate: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateGoal(editId, formData);
      setEditMode(false);
      setEditId(null);
    } else {
      await createGoal(formData);
    }
    setFormData({
      goalName: "",
      targetValue: "",
      currentValue: "",
      goalStartDate: "",
      goalEndDate: "",
    });
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteGoal(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        Your Goals
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Add Goal Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition"
      >
        + Add Goal
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              Add New Goal
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="goalName"
                placeholder="Goal Name"
                value={formData.goalName}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
              <input
                type="number"
                name="targetValue"
                placeholder="Target Value"
                value={formData.targetValue}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
              <input
                type="number"
                name="currentValue"
                placeholder="Current Value"
                value={formData.currentValue}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
              />
              <input
                type="date"
                name="goalStartDate"
                value={formData.goalStartDate}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
              <input
                type="date"
                name="goalEndDate"
                value={formData.goalEndDate}
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
                  {editMode ? "Update Goal" : "Add Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <div
            key={goal.goalID}
            className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              {goal.goalName}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Target Value:</strong> {goal.targetValue}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Current Value:</strong> {goal.currentValue}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Date Range:</strong> {new Date(goal.goalStartDate).toLocaleDateString()} -{" "}
              {new Date(goal.goalEndDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleDelete(goal.goalID)}
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

export default GoalPage;
