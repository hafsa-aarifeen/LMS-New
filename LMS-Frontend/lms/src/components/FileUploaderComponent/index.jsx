import React, { useState } from "react";
import axios from "axios";

const FileUploader = ({
  courseId,
  unitName,
  file,
  setFile,
  setFileDetails,
  fileDetails,
}) => {
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId);
    formData.append("unitName", unitName);

    axios
      .post("/api/upload", formData)
      .then((response) => {
        setFileDetails(response.data);
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle the error here
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default FileUploader;
