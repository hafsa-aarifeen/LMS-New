import { useQuery } from "react-query";
import axios from "axios";

const useGetCourse = ({ courseId }) => {
  const fetchCommon = async () => {
    try {
      const data = await axios.get(`api/files/course/${courseId}`);
      return data?.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["pdfData", courseId], fetchCommon, {
    refetchOnWindowFocus: false,
  });
};

export default useGetCourse;
