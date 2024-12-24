import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore"; // Kullanıcı bilgilerini almak için

const useActivityStore = create((set) => ({
  activities: [],
  loading: false,
  error: null,

  // Kullanıcıya göre aktiviteleri getir
  fetchActivities: async () => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    // Kullanıcı giriş yapmamışsa hata döndür
    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5250/api/Activity/user/${user.userID}`);
      set({ activities: response.data, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch activities.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Yeni aktivite oluştur
  createActivity: async (activity) => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5250/api/Activity",
        { ...activity, userID: user.userID } // UserID'yi backend'e gönderiyoruz
      );
      set((state) => ({
        activities: [...state.activities, response.data],
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create the activity. Please check your input.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Aktiviteyi sil
  deleteActivity: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:5250/api/Activity/${id}`);
      set((state) => ({
        activities: state.activities.filter((a) => a.activityID !== id),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete the activity.";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useActivityStore;
