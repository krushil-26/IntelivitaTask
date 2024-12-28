import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecord } from "./redux/jsonDataSlice";

const FileUpload = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/json") {
      setErrorMessage("Please upload a valid JSON file.");
      setFileName("");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result);
        dispatch(addRecord(jsonData));
        setFileName(file.name); // Set the uploaded file name
        setErrorMessage(""); // Clear any error messages
      } catch (error) {
        setErrorMessage("Invalid JSON content.");
        setFileName("");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6 p-6 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Upload JSON File</h2>
      <label
        htmlFor="file-upload"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-200"
      >
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />

      {fileName && (
        <p className="text-sm text-green-500 mt-2">
          Uploaded File: <span className="font-medium">{fileName}</span>
        </p>
      )}
      {errorMessage && (
        <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default FileUpload;
