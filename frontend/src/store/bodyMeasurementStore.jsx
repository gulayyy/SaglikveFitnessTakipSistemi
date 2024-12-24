import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore"; // Kullanıcı bilgilerini almak için

const useBodyMeasurementStore = create((set) => ({
  bodyMeasurements: [],
  loading: false,
  error: null,

  fetchBodyMeasurementsByUser: async () => {
    set({ loading: true, error: null });
  
    const user = useAuthStore.getState().user;
  
    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:5250/api/BodyMeasurement/user/${user.userID}`
      );
      set({ bodyMeasurements: response.data, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to fetch body measurements by user.";
      set({ error: errorMessage, loading: false });
    }
  },
  

  // Yeni vücut ölçümü ekle
  createBodyMeasurement: async (bodyMeasurement) => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5250/api/BodyMeasurement",
        { ...bodyMeasurement, userID: user.userID } // Kullanıcı ID'sini ekliyoruz
      );
      set((state) => ({
        bodyMeasurements: [...state.bodyMeasurements, response.data],
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create the body measurement. Please check your input.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Vücut ölçümünü güncelle
  updateBodyMeasurement: async (id, bodyMeasurement) => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      await axios.put(
        `http://localhost:5250/api/BodyMeasurement/${id}`,
        { ...bodyMeasurement, userID: user.userID } // Kullanıcı ID'sini güncelleme için ekliyoruz
      );
      set((state) => ({
        bodyMeasurements: state.bodyMeasurements.map((b) =>
          b.measurementID === id ? { ...b, ...bodyMeasurement } : b
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update the body measurement.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Vücut ölçümünü sil
  deleteBodyMeasurement: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:5250/api/BodyMeasurement/${id}`);
      set((state) => ({
        bodyMeasurements: state.bodyMeasurements.filter(
          (b) => b.measurementID !== id
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete the body measurement.";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useBodyMeasurementStore;
