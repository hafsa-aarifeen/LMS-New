import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useRegisterStudent = () => {
  const QueryClient = useQueryClient();
  const url = "http://localhost:8080/registerStudent";

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

export default useRegisterStudent;
