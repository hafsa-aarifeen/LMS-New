import { useQuery } from "react-query";
import axios from "axios";

const useGetRegisteredStudents = (deleter) => {
  const fetchCommon = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/registeredStudents`);
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["registeredStudents", deleter], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useGetRegisteredStudents;
