import React, { useEffect, useState } from "react";
import useMedicalRecordStore from "../store/medicalRecordStore";

const MedicalRecordPage = () => {
  const {
    medicalRecords,
    fetchMedicalRecordsByUser,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
    loading,
    error,
  } = useMedicalRecordStore();

  const [formData, setFormData] = useState({
    recordDate: "",
    diagnosis: "",
    notes: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMedicalRecordsByUser();
  }, [fetchMedicalRecordsByUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateMedicalRecord(editId, formData);
      setEditMode(false);
      setEditId(null);
    } else {
      await createMedicalRecord(formData);
    }
    setFormData({
      recordDate: "",
      diagnosis: "",
      notes: "",
    });
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setEditId(record.recordID);
    setFormData({
      recordDate: record.recordDate.split("T")[0],
      diagnosis: record.diagnosis || "",
      notes: record.notes || "",
    });
  };

  const handleDelete = async (id) => {
    await deleteMedicalRecord(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Medical Records</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="date"
          name="recordDate"
          value={formData.recordDate}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          required
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="block w-full p-2 border rounded"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Record" : "Add Record"}
        </button>
      </form>

      <ul className="space-y-4">
        {medicalRecords.map((record) => (
          <li key={record.recordID} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">
              {new Date(record.recordDate).toLocaleDateString()}
            </h2>
            <p>Diagnosis: {record.diagnosis}</p>
            <p>Notes: {record.notes}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(record)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(record.recordID)}
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

export default MedicalRecordPage;
