import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useRegisterTeacher = () => {
  const QueryClient = useQueryClient();
  const url = "http://localhost:8080/registerTeacher";

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

export default useRegisterTeacher;
