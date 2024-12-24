import React, { useEffect, useState } from "react";
import useMotivationalQuoteStore from "../store/motivationalQuoteStore";

const MotivationalQuotePage = () => {
  const { quotes, fetchQuotes, createQuote, updateQuote, deleteQuote, loading, error } = useMotivationalQuoteStore();
  const [formData, setFormData] = useState({
    quoteText: "",
    author: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateQuote(editId, formData);
      setEditMode(false);
      setEditId(null);
    } else {
      await createQuote(formData);
    }
    setFormData({
      quoteText: "",
      author: "",
    });
  };

  const handleEdit = (quote) => {
    setEditMode(true);
    setEditId(quote.quoteID);
    setFormData({
      quoteText: quote.quoteText,
      author: quote.author || "",
    });
  };

  const handleDelete = async (id) => {
    await deleteQuote(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Motivational Quotes</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <textarea
          name="quoteText"
          placeholder="Quote Text"
          value={formData.quoteText}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          rows="3"
          required
        ></textarea>
        <input
          type="text"
          name="author"
          placeholder="Author (optional)"
          value={formData.author}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Quote" : "Add Quote"}
        </button>
      </form>

      <ul className="space-y-4">
        {quotes.map((quote) => (
          <li key={quote.quoteID} className="p-4 border rounded shadow">
            <p className="text-lg font-semibold">"{quote.quoteText}"</p>
            <p className="text-gray-500">- {quote.author || "Unknown"}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(quote)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(quote.quoteID)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotivationalQuotePage;
