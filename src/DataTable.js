import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { deleteRecord, updateRecord } from "./redux/jsonDataSlice";
import { toast } from "react-toastify";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";

const DataTableComponent = () => {
  const { data } = useSelector((state) => state.jsonData);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For edit modal
  const [editRecord, setEditRecord] = useState({ id: "", name: "", email: "" });
  const [recordToDelete, setRecordToDelete] = useState(null); // Record selected for deletion

  const handleDelete = (id) => {
    dispatch(deleteRecord(id));
    toast.success("Record deleted successfully!");
  };

  const openEditModal = (record) => {
    setEditRecord(record);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (updatedRecord) => {
    if (data.some((record) => record.email === updatedRecord.email && record.id !== updatedRecord.id)) {
      toast.error("Email must be unique!");
      return;
    }

    dispatch(updateRecord({ id: updatedRecord.id, updatedRecord }));
    setIsEditModalOpen(false);
    toast.success("Record updated successfully!");
  };

  const filteredData = data.filter((record) =>
    [record.id, record.name, record.email].some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Actions",
      width: "200px",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setRecordToDelete(row); // Set the record to delete
              setIsDeleteModalOpen(true); // Open the delete modal
            }}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => openEditModal(row)}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID, Name, or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Data Table or Message */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-lg text-gray-600">
          Please upload a JSON file.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          className="bg-white shadow rounded"
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        record={recordToDelete}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSave}
        record={editRecord}
      />
    </div>
  );
};

export default DataTableComponent;
    