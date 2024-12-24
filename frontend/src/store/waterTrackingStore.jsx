import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore"; // Kullanıcı bilgilerini almak için

const useWaterTrackingStore = create((set) => ({
  waterTrackings: [],
  loading: false,
  error: null,

  // Giriş yapan kullanıcıya ait su kayıtlarını getir
  fetchWaterTrackingsByUser: async () => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5250/api/WaterTracking/user/${user.userID}`
      );
      set({ waterTrackings: response.data, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch water trackings.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Yeni su kaydı oluştur
  createWaterTracking: async (waterTracking) => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5250/api/WaterTracking",
        { ...waterTracking, userID: user.userID } // Kullanıcı ID'sini backend'e gönderiyoruz
      );
      set((state) => ({
        waterTrackings: [...state.waterTrackings, response.data],
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create water tracking.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Su kaydını güncelle
  updateWaterTracking: async (id, waterTracking) => {
    set({ loading: true, error: null });

    try {
      await axios.put(
        `http://localhost:5250/api/WaterTracking/${id}`,
        waterTracking
      );
      set((state) => ({
        waterTrackings: state.waterTrackings.map((wt) =>
          wt.waterID === id ? { ...wt, ...waterTracking } : wt
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update water tracking.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Su kaydını sil
  deleteWaterTracking: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:5250/api/WaterTracking/${id}`);
      set((state) => ({
        waterTrackings: state.waterTrackings.filter(
          (wt) => wt.waterID !== id
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete water tracking.";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useWaterTrackingStore;
