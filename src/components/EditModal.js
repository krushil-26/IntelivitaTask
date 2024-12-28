import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, onSave, record }) => {
  const [localRecord, setLocalRecord] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    if (record) {
      setLocalRecord(record); // Set local state to the selected record
    }
  }, [record]);

  const handleSave = () => {
    if (localRecord.name === "" || localRecord.email === "") {
      return;
    }
    onSave(localRecord); // Pass the updated record to the parent
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Edit Record</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={localRecord.name}
            onChange={(e) => setLocalRecord((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={localRecord.email}
            onChange={(e) => setLocalRecord((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
