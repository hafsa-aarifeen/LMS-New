import { useQuery } from "react-query";
import axios from "axios";

const useGetTeacherById = ({ teacherId }) => {
  const fetchCommon = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/getTeacher/${teacherId}`
      );
      return data?.data[0];
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["teachersListDataById", teacherId], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useGetTeacherById;
