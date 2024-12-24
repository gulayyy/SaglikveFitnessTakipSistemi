import { create } from "zustand";
import axios from "axios";

const useMotivationalQuoteStore = create((set) => ({
  quotes: [],
  loading: false,
  error: null,

  // Tüm alıntıları getir
  fetchQuotes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:5250/api/MotivationalQuote");
      set({ quotes: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Yeni alıntı ekle
  createQuote: async (quote) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("http://localhost:5250/api/MotivationalQuote", quote);
      set((state) => ({
        quotes: [...state.quotes, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Alıntıyı güncelle
  updateQuote: async (id, quote) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`http://localhost:5250/api/MotivationalQuote/${id}`, quote);
      set((state) => ({
        quotes: state.quotes.map((q) => (q.quoteID === id ? { ...q, ...quote } : q)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Alıntıyı sil
  deleteQuote: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`http://localhost:5250/api/MotivationalQuote/${id}`);
      set((state) => ({
        quotes: state.quotes.filter((q) => q.quoteID !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useMotivationalQuoteStore;
