import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useAssignTeacherCourses = () => {
  const QueryClient = useQueryClient();
  const url = "http://localhost:8080/assignCoursesForTeacher";

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

export default useAssignTeacherCourses;
