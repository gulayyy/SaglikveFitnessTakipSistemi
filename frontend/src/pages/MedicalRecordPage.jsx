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

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false);
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setEditId(record.recordID);
    setFormData({
      recordDate: record.recordDate.split("T")[0],
      diagnosis: record.diagnosis || "",
      notes: record.notes || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteMedicalRecord(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
        Medical Records
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Add Record Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition"
      >
        + Add Record
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              {editMode ? "Edit Medical Record" : "Add Medical Record"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="date"
                name="recordDate"
                value={formData.recordDate}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="text"
                name="diagnosis"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                required
              />
              <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="block w-full p-4 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                rows="4"
              ></textarea>
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
                  {editMode ? "Update Record" : "Add Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Medical Records List */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {medicalRecords.map((record) => (
          <div
            key={record.recordID}
            className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              {new Date(record.recordDate).toLocaleDateString()}
            </h2>
            <p className="text-gray-700">
              <strong>Diagnosis:</strong> {record.diagnosis}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Notes:</strong> {record.notes || "N/A"}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleDelete(record.recordID)}
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

export default MedicalRecordPage;
