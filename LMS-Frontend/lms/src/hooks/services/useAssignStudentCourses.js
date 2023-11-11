import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useAssignStudentCourses = () => {
  const QueryClient = useQueryClient();
  const url = "http://localhost:8080/assignCoursesForStudents";

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

export default useAssignStudentCourses;
