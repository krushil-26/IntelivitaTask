import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, record }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">Delete Record</h2>
        <p className="mb-4 text-center">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-center gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              onConfirm(record.id); // Call parent method to delete the record
              onClose(); // Close modal after deletion
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
