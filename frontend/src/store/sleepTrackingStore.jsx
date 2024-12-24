import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore";

const useSleepTrackingStore = create((set) => ({
  sleepTrackings: [],
  loading: false,
  error: null,
  fetchSleepTrackingsByUser: async () => {
    set({ loading: true, error: null });
  
    const user = useAuthStore.getState().user;
  
    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:5250/api/SleepTracking/user/${user.userID}`);
      set({ sleepTrackings: response.data, loading: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch sleep trackings.";
      set({ error: errorMessage, loading: false });
    }
  },
  
  // Yeni uyku takibi kaydı oluştur
  createSleepTracking: async (sleepTracking) => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5250/api/SleepTracking", {
        ...sleepTracking,
        userID: user.userID, // Kullanıcı ID'sini gönderiyoruz
      });
      set((state) => ({
        sleepTrackings: [...state.sleepTrackings, response.data],
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create sleep tracking.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Uyku takibini güncelle
  updateSleepTracking: async (id, sleepTracking) => {
    set({ loading: true, error: null });

    try {
      await axios.put(`http://localhost:5250/api/SleepTracking/${id}`, sleepTracking);
      set((state) => ({
        sleepTrackings: state.sleepTrackings.map((st) =>
          st.sleepID === id ? { ...st, ...sleepTracking } : st
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update sleep tracking.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Uyku takibini sil
  deleteSleepTracking: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:5250/api/SleepTracking/${id}`);
      set((state) => ({
        sleepTrackings: state.sleepTrackings.filter((st) => st.sleepID !== id),
        loading: false,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete sleep tracking.";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useSleepTrackingStore;
