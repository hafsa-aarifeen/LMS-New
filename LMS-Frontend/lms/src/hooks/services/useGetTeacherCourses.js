import { useQuery } from "react-query";
import axios from "axios";

const useGetTeacherCourses = ({ teacherId }) => {
  const fetchCommon = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/getTeacherCourses/${teacherId}`
      );
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["getTeacherCourses", teacherId], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useGetTeacherCourses;
