import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./authStore"; // Kullanıcı oturum bilgisini almak için

const useGoalStore = create((set) => ({
  goals: [],
  loading: false,
  error: null,

  // Tüm hedefleri getir (giriş yapan kullanıcıya göre)
  fetchGoals: async () => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5250/api/Goal/user/${user.userID}`);
      set({ goals: response.data, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch goals for the user.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Yeni hedef oluştur
  createGoal: async (goal) => {
    set({ loading: true, error: null });

    const user = useAuthStore.getState().user;

    if (!user) {
      set({ error: "No logged-in user found.", loading: false });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5250/api/Goal", {
        ...goal,
        userID: user.userID, // Kullanıcı ID'sini ekliyoruz
      });
      set((state) => ({
        goals: [...state.goals, response.data],
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create the goal. Please check your input.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Hedefi güncelle
  updateGoal: async (id, goal) => {
    set({ loading: true, error: null });

    try {
      await axios.put(`http://localhost:5250/api/Goal/${id}`, goal);
      set((state) => ({
        goals: state.goals.map((g) => (g.goalID === id ? { ...g, ...goal } : g)),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update the goal.";
      set({ error: errorMessage, loading: false });
    }
  },

  // Hedefi sil
  deleteGoal: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:5250/api/Goal/${id}`);
      set((state) => ({
        goals: state.goals.filter((g) => g.goalID !== id),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete the goal.";
      set({ error: errorMessage, loading: false });
    }
  },
}));

export default useGoalStore;
