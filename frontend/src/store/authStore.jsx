// src/store/authStore.js
import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  loginUser: async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5250/api/User/login", {
        email,
        password,
      });
      set({ user: response.data.user });
      return response.data;
    } catch (err) {
      throw err.response ? err.response.data : { message: "Server error" };
    }
  },
  logoutUser: () => set({ user: null }),
}));

export const loginUser = async (email, password) => {
  const authStore = useAuthStore.getState();
  return await authStore.loginUser(email, password);
};

export default useAuthStore;
