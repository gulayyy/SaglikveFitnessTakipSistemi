import React, { useEffect, useState } from "react";
import useMotivationalQuoteStore from "../store/motivationalQuoteStore";

const MotivationalQuotePage = () => {
  const { quotes, fetchQuotes, createQuote, updateQuote, deleteQuote, loading, error } =
    useMotivationalQuoteStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteQuote(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        Motivational Quotes
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Add Quote Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition"
      >
        + Add Quote
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              Add New Quote
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                name="quoteText"
                placeholder="Quote Text"
                value={formData.quoteText}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                rows="4"
                required
              ></textarea>
              <input
                type="text"
                name="author"
                placeholder="Author (optional)"
                value={formData.author}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
                >
                  {editMode ? "Update Quote" : "Add Quote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quotes List */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote) => (
          <div
            key={quote.quoteID}
            className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <p className="text-lg font-semibold text-gray-800 mb-4">
              "{quote.quoteText}"
            </p>
            <p className="text-gray-600 text-right italic">
              - {quote.author || "Unknown"}
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => handleDelete(quote.quoteID)}
                className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationalQuotePage;
