import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreateCourse = () => {
  const QueryClient = useQueryClient();
  const url = "http://localhost:8080/saveCourse";

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

export default useCreateCourse;
