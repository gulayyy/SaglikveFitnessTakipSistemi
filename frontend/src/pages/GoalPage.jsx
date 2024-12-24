import React, { useEffect, useState } from "react";
import useGoalStore from "../store/goalStore";

const GoalPage = () => {
  const { goals, fetchGoals, createGoal, updateGoal, deleteGoal, loading, error } = useGoalStore();
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
  };

  const handleEdit = (goal) => {
    setEditMode(true);
    setEditId(goal.goalID);
    setFormData({
      goalName: goal.goalName || "",
      targetValue: goal.targetValue || "",
      currentValue: goal.currentValue || "",
      goalStartDate: goal.goalStartDate.split("T")[0],
      goalEndDate: goal.goalEndDate.split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    await deleteGoal(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Goals</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="goalName"
          placeholder="Goal Name"
          value={formData.goalName}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="targetValue"
          placeholder="Target Value"
          value={formData.targetValue}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="currentValue"
          placeholder="Current Value"
          value={formData.currentValue}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="goalStartDate"
          placeholder="Start Date"
          value={formData.goalStartDate}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="goalEndDate"
          placeholder="End Date"
          value={formData.goalEndDate}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Goal" : "Add Goal"}
        </button>
      </form>

      <ul className="space-y-4">
        {goals.map((goal) => (
          <li key={goal.goalID} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{goal.goalName}</h2>
            <p>Target Value: {goal.targetValue}</p>
            <p>Current Value: {goal.currentValue}</p>
            <p>
              Date Range: {new Date(goal.goalStartDate).toLocaleDateString()} -{" "}
              {new Date(goal.goalEndDate).toLocaleDateString()}
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(goal)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(goal.goalID)}
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

export default GoalPage;
