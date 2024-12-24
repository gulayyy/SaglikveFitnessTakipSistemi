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

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false);
  };

  const handleEdit = (reminder) => {
    setEditMode(true);
    setEditId(reminder.reminderID);
    setFormData({
      reminderText: reminder.reminderText,
      reminderDate: reminder.reminderDate.split("T")[0],
      isCompleted: reminder.isCompleted,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteReminder(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        Reminders
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Add Reminder Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition"
      >
        + Add Reminder
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              {editMode ? "Edit Reminder" : "Add Reminder"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="reminderText"
                placeholder="Reminder Text"
                value={formData.reminderText}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="date"
                name="reminderDate"
                value={formData.reminderDate}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                required
              />
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  name="isCompleted"
                  checked={formData.isCompleted}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Completed
              </label>
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
                  {editMode ? "Update Reminder" : "Add Reminder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reminders.map((reminder) => (
          <div
            key={reminder.reminderID}
            className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {reminder.reminderText}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Date:</strong> {new Date(reminder.reminderDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {reminder.isCompleted ? "Completed" : "Pending"}
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => handleDelete(reminder.reminderID)}
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

export default ReminderPage;
