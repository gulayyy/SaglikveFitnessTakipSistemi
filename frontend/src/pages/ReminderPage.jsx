import React, { useEffect, useState } from "react";
import useReminderStore from "../store/reminderStore";
import useAuthStore from "../store/authStore"; // Kullanıcı bilgisi için

const ReminderPage = () => {
  const { user } = useAuthStore(); // Giriş yapan kullanıcı bilgisi
  const {
    reminders,
    fetchRemindersByUser,
    createReminder,
    updateReminder,
    deleteReminder,
    loading,
    error,
  } = useReminderStore();

  const [formData, setFormData] = useState({
    reminderText: "",
    reminderDate: "",
    isCompleted: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchRemindersByUser(user.userID); // Giriş yapan kullanıcının ID'si ile çağır
    }
  }, [fetchRemindersByUser, user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Kullanıcı bilgisi bulunamadı! Lütfen tekrar giriş yapınız.");
      return;
    }

    const reminder = {
      ...formData,
      userID: user.userID, // Kullanıcı ID'sini ekle
    };

    if (editMode) {
      await updateReminder(editId, reminder);
      setEditMode(false);
      setEditId(null);
    } else {
      await createReminder(reminder);
    }

    setFormData({
      reminderText: "",
      reminderDate: "",
      isCompleted: false,
    });
  };

  const handleEdit = (reminder) => {
    setEditMode(true);
    setEditId(reminder.reminderID);
    setFormData({
      reminderText: reminder.reminderText,
      reminderDate: reminder.reminderDate.split("T")[0],
      isCompleted: reminder.isCompleted,
    });
  };

  const handleDelete = async (id) => {
    await deleteReminder(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="reminderText"
          placeholder="Reminder Text"
          value={formData.reminderText}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="reminderDate"
          value={formData.reminderDate}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isCompleted"
            checked={formData.isCompleted}
            onChange={handleInputChange}
            className="mr-2"
          />
          Completed
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Reminder" : "Add Reminder"}
        </button>
      </form>

      <ul className="space-y-4">
        {reminders.map((reminder) => (
          <li key={reminder.reminderID} className="p-4 border rounded shadow">
            <p className="text-lg font-bold">{reminder.reminderText}</p>
            <p>{new Date(reminder.reminderDate).toLocaleDateString()}</p>
            <p>Status: {reminder.isCompleted ? "Completed" : "Pending"}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(reminder)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(reminder.reminderID)}
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

export default ReminderPage;
