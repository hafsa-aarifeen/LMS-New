import { useQuery } from "react-query";
import axios from "axios";

const useGetAttendance = ({ studentId, courseId }) => {
  const fetchCommon = async () => {
    const query = new URLSearchParams();
    if (studentId) {
      query.append("studentId", studentId);
    }
    if (courseId) {
      query.append("courseId", courseId);
    }
    try {
      const data = await axios.get(
        `http://localhost:8080/getAttendance?${query.toString()}`
      );
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["attendanceData", studentId, courseId], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useGetAttendance;
