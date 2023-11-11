import { useQuery } from "react-query";
import axios from "axios";

const useGetStudentDetails = ({ studentId, courseId, courseName }) => {
  const fetchCommon = async () => {
    const query = new URLSearchParams();
    if (courseId) {
      query.append("courseId", courseId);
    }
    if (studentId) {
      query.append("studentId", studentId);
    }
    if (courseName) {
      query.append("courseName", courseName);
    }

    try {
      const data = await axios.get(
        `http://localhost:8080/getStudentDetails?${query.toString()}`
      );
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(
    ["studentData", studentId, courseId, courseName],
    fetchCommon,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useGetStudentDetails;
