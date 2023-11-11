// import axios from "axios";
// const UseFileUploader = ({ file, courseId, unitName }) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("courseId", courseId);
//   formData.append("unitName", unitName);

//   axios
//     .post("/api/upload", formData)
//     .then((response) => {
//       console.log("response", response.data);
//       return response;
//     })
//     .catch((error) => {
//       console.error("Error uploading file:", error);
//     });
// };
// export default UseFileUploader;

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const UseFileUploader = ({ file, courseId, unitName }) => {
  const QueryClient = useQueryClient();
  const query = new URLSearchParams();
  if (courseId) {
    query.append("courseId", courseId);
  }
  if (file) {
    query.append("file", file);
  }
  if (unitName) {
    query.append("unitName", unitName);
  }
  const url = `http://localhost:8080/api/upload?${query.toString()}`;

  return useMutation(
    async (obj) => await axios.post(url, obj),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries();
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default UseFileUploader;
