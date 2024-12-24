import React, { useEffect, useState } from "react";
import useBodyMeasurementStore from "../store/bodyMeasurementStore";
import useAuthStore from "../store/authStore"; // authStore'dan giriş yapan kullanıcı bilgisi alınır.

const BodyMeasurementPage = () => {
  const { user } = useAuthStore(); // Giriş yapan kullanıcı bilgisi
  const {
    bodyMeasurements,
    fetchBodyMeasurementsByUser,
    createBodyMeasurement,
    updateBodyMeasurement,
    deleteBodyMeasurement,
    loading,
    error,
  } = useBodyMeasurementStore();

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
  };

  const handleEdit = (measurement) => {
    setEditMode(true);
    setEditId(measurement.measurementID);
    setFormData({
      chest: measurement.chest || "",
      waist: measurement.waist || "",
      hips: measurement.hips || "",
      arm: measurement.arm || "",
      leg: measurement.leg || "",
      measurementDate: measurement.measurementDate.split("T")[0],
    });
  };

  const handleDelete = async (id) => {
    await deleteBodyMeasurement(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Body Measurements</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="number"
          name="chest"
          placeholder="Chest (cm)"
          value={formData.chest}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
        />
        <input
          type="number"
          name="waist"
          placeholder="Waist (cm)"
          value={formData.waist}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
        />
        <input
          type="number"
          name="hips"
          placeholder="Hips (cm)"
          value={formData.hips}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
        />
        <input
          type="number"
          name="arm"
          placeholder="Arm (cm)"
          value={formData.arm}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
        />
        <input
          type="number"
          name="leg"
          placeholder="Leg (cm)"
          value={formData.leg}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
        />
        <input
          type="date"
          name="measurementDate"
          placeholder="Measurement Date"
          value={formData.measurementDate}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Measurement" : "Add Measurement"}
        </button>
      </form>

      <ul className="space-y-4">
        {bodyMeasurements.map((measurement) => (
          <li key={measurement.measurementID} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">Measurement on {new Date(measurement.measurementDate).toLocaleDateString()}</h2>
            <p>Chest: {measurement.chest || "N/A"} cm</p>
            <p>Waist: {measurement.waist || "N/A"} cm</p>
            <p>Hips: {measurement.hips || "N/A"} cm</p>
            <p>Arm: {measurement.arm || "N/A"} cm</p>
            <p>Leg: {measurement.leg || "N/A"} cm</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(measurement)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(measurement.measurementID)}
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

export default BodyMeasurementPage;
