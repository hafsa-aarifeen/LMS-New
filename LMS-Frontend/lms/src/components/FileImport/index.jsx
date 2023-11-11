// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Grid, Typography } from "@material-ui/core";

// import UseDownloadFile from "../../hooks/services/useDownloadFile";

// const FileImport = ({ courseId, file }) => {
//   const [pdfFiles, setPdfFiles] = useState([]);
//   console.log("pdfFiles", pdfFiles);
//   //   const downloadFile = useDownloadFile();

//   useEffect(() => {
//     fetchData();
//   }, [courseId, file]);
//   if (pdfFiles.length === 0) {
//     return <div>No PDF files found for this course.</div>;
//   }

//   const handleDownloadFile = (values) => {
//     UseDownloadFile(values.filePath, values.fileName);
//   };

//   return (
//     <Grid>
//       {pdfFiles.map((pdfFile) => (
//         <li
//           style={{
//             color: "#030303",
//             fontSize: "16px",
//             textDecoration: "none",
//             listStyleType: "none",
//           }}
//           onClick={() => handleDownloadFile(pdfFile)}
//           key={pdfFile.id}
//         >
//           <Typography varient="h6">{pdfFile.fileName}</Typography>
//         </li>
//       ))}
//     </Grid>
//   );
// };

// export default FileImport;
