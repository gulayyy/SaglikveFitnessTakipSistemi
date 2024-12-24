import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore"; // Kullanıcı bilgilerini almak için

const useMedicalRecordStore = create((set) => ({
  medicalRecords: [],
  loading: false,
  error: null,

  fetchMedicalRecordsByUser: async () => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5250/api/MedicalRecord/user/${user.userID}`);
      set({ medicalRecords: response.data, loading: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch medical records.";
      set({ error: errorMessage, loading: false });
    }
  },

  createMedicalRecord: async (record) => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5250/api/MedicalRecord", {
        ...record,
        userID: user.userID,
      });
      set((state) => ({
        medicalRecords: [...state.medicalRecords, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateMedicalRecord: async (id, record) => {
    set({ loading: true, error: null });

    try {
      await axios.put(`http://localhost:5250/api/MedicalRecord/${id}`, record);
      set((state) => ({
        medicalRecords: state.medicalRecords.map((r) =>
          r.recordID === id ? { ...r, ...record } : r
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteMedicalRecord: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:5250/api/MedicalRecord/${id}`);
      set((state) => ({
        medicalRecords: state.medicalRecords.filter((r) => r.recordID !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useMedicalRecordStore;
