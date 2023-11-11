import { useQuery } from "react-query";
import axios from "axios";

const useGetRegisteredTeachers = (deleted) => {
  const fetchCommon = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/registeredTeachers`);
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["registeredTeachers", deleted], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useGetRegisteredTeachers;
