import { useQuery } from "react-query";
import axios from "axios";

const useGetCourse = ({ courseId }) => {
  const fetchCommon = async () => {
    const query = new URLSearchParams();
    if (courseId) {
      query.append("courseId", courseId);
    }
    try {
      const data = await axios.get(
        `http://localhost:8080/getCourse?${query.toString()}`
      );
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["courseData", courseId], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useGetCourse;
