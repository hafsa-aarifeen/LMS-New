import React from "react";

const PdfDownloader = ({ fileName, pathname }) => {
  const handleDownload = () => {
    fetch(`/api/${pathname}`, { method: "GET" })
      .then((response) => response.blob())
      .then((blob) => {
        // Create a blob URL for the PDF data received from the server
        const url = window.URL.createObjectURL(blob);

        // Create a link element and trigger a download programmatically
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();

        // Clean up by revoking the blob URL
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PdfDownloader;
