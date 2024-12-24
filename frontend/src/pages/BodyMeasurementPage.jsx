import React, { useEffect, useState } from "react";
import useBodyMeasurementStore from "../store/bodyMeasurementStore";
import useAuthStore from "../store/authStore"; // authStore'dan giriş yapan kullanıcı bilgisi alınır.

const BodyMeasurementPage = () => {
  const { user } = useAuthStore(); // Giriş yapan kullanıcı bilgisi
  const {
    bodyMeasurements,
    fetchBodyMeasurementsByUser,
    createBodyMeasurement,
    deleteBodyMeasurement,
    loading,
    error,
  } = useBodyMeasurementStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    chest: "",
    waist: "",
    hips: "",
    arm: "",
    leg: "",
    measurementDate: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBodyMeasurementsByUser();
  }, [fetchBodyMeasurementsByUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Kullanıcı bilgisi bulunamadı! Lütfen tekrar giriş yapınız.");
      return;
    }

    const bodyMeasurement = {
      ...formData,
      userID: user.userID, // userID eklenir
    };

    if (editMode) {
      await updateBodyMeasurement(editId, bodyMeasurement);
      setEditMode(false);
      setEditId(null);
    } else {
      await createBodyMeasurement(bodyMeasurement);
    }

    setFormData({
      chest: "",
      waist: "",
      hips: "",
      arm: "",
      leg: "",
      measurementDate: "",
    });
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteBodyMeasurement(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        Your Body Measurements
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Add Measurement Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition"
      >
        + Add Measurement
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              Add New Measurement
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="number"
                name="chest"
                placeholder="Chest (cm)"
                value={formData.chest}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
              <input
                type="number"
                name="waist"
                placeholder="Waist (cm)"
                value={formData.waist}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
              />
              <input
                type="number"
                name="hips"
                placeholder="Hips (cm)"
                value={formData.hips}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
              />
              <input
                type="number"
                name="arm"
                placeholder="Arm (cm)"
                value={formData.arm}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
              />
              <input
                type="number"
                name="leg"
                placeholder="Leg (cm)"
                value={formData.leg}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
              />
              <input
                type="date"
                name="measurementDate"
                value={formData.measurementDate}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
                required
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Measurements List */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bodyMeasurements.map((measurement) => (
          <div
            key={measurement.measurementID}
            className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              Measurement on {new Date(measurement.measurementDate).toLocaleDateString()}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Chest:</strong> {measurement.chest || "N/A"} cm
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Waist:</strong> {measurement.waist || "N/A"} cm
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Hips:</strong> {measurement.hips || "N/A"} cm
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Arm:</strong> {measurement.arm || "N/A"} cm
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Leg:</strong> {measurement.leg || "N/A"} cm
            </p>
            <button
              onClick={() => handleDelete(measurement.measurementID)}
              className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyMeasurementPage;
