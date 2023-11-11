import axios from "axios";
const UseDownloadFile = (filePath, fileName) => {
  // If you're using fetch:
  fetch(filePath)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((error) => {
      console.error("Error downloading PDF file:", error);
    });

  // If you're using Axios:
  // axios({
  //   url: filePath,
  //   method: "GET",
  //   responseType: "blob",
  // }).then((response) => {
  //   const url = window.URL.createObjectURL(new Blob([response.data]));
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = fileName;
  //   document.body.appendChild(a);
  //   a.click();
  //   a.remove();
  // });
};
export default UseDownloadFile;
