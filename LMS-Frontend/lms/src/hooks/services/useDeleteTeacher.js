import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteTeacher = ({ id }) => {
  const queryClient = useQueryClient();
  const deleteRequestItem = `http://localhost:8080/deleteTeacher/${id}`;

  return useMutation(() => axios.delete(deleteRequestItem), {
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
    onError: async () => {
      console.log("error");
    },
  });
};

export default useDeleteTeacher;
