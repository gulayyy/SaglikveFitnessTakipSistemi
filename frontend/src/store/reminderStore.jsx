import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore"; // authStore'u dahil edin

const useReminderStore = create((set) => ({
  reminders: [],
  loading: false,
  error: null,

  // Kullanıcıya göre hatırlatıcıları getir
  fetchRemindersByUser: async (userID) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`http://localhost:5250/api/Reminder/user/${userID}`);
      set({ reminders: response.data, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch reminders by user.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Yeni hatırlatıcı oluştur
  createReminder: async (reminder) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post("http://localhost:5250/api/Reminder", reminder);
      set((state) => ({
        reminders: [...state.reminders, response.data],
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create the reminder.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Hatırlatıcıyı güncelle
  updateReminder: async (id, reminder) => {
    set({ loading: true, error: null });

    try {
      await axios.put(`http://localhost:5250/api/Reminder/${id}`, reminder);
      set((state) => ({
        reminders: state.reminders.map((r) =>
          r.reminderID === id ? { ...r, ...reminder } : r
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update the reminder.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Hatırlatıcıyı sil
  deleteReminder: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:5250/api/Reminder/${id}`);
      set((state) => ({
        reminders: state.reminders.filter((r) => r.reminderID !== id),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete the reminder.";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useReminderStore;
