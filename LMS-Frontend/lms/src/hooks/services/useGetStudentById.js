import { useQuery } from "react-query";
import axios from "axios";

const useGetStudentById = ({ studentId }) => {
  const fetchCommon = async () => {
    try {
      const data = await axios.get(
        `http://localhost:8080/getStudent/${studentId}`
      );
      return data?.data[0];
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["studentListById", studentId], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useGetStudentById;
