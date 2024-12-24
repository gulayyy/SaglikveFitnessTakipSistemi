import React, { useEffect, useState } from "react";
import useWaterTrackingStore from "../store/waterTrackingStore";

const WaterTrackingPage = () => {
  const {
    waterTrackings,
    fetchWaterTrackingsByUser,
    createWaterTracking,
    updateWaterTracking,
    deleteWaterTracking,
    loading,
    error,
  } = useWaterTrackingStore();

  const [formData, setFormData] = useState({
    waterAmountInLiters: "",
    waterDate: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchWaterTrackingsByUser(); // Giriş yapan kullanıcıya özel su kayıtlarını getir
  }, [fetchWaterTrackingsByUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateWaterTracking(editId, formData);
      setEditMode(false);
      setEditId(null);
    } else {
      await createWaterTracking(formData);
    }
    setFormData({
      waterAmountInLiters: "",
      waterDate: "",
    });
  };

  const handleEdit = (tracking) => {
    setEditMode(true);
    setEditId(tracking.waterID);
    setFormData({
      waterAmountInLiters: tracking.waterAmountInLiters,
      waterDate: tracking.waterDate.split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    await deleteWaterTracking(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Water Tracking</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label>Water Amount (Liters):</label>
          <input
            type="number"
            name="waterAmountInLiters"
            value={formData.waterAmountInLiters}
            onChange={handleInputChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Water Date:</label>
          <input
            type="date"
            name="waterDate"
            value={formData.waterDate}
            onChange={handleInputChange}
            className="block w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Water Tracking" : "Add Water Tracking"}
        </button>
      </form>

      <ul className="space-y-4">
        {waterTrackings.map((tracking) => (
          <li key={tracking.waterID} className="p-4 border rounded shadow">
            <p>
              <strong>Amount:</strong> {tracking.waterAmountInLiters} L
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(tracking.waterDate).toLocaleDateString()}
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(tracking)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tracking.waterID)}
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

export default WaterTrackingPage;
