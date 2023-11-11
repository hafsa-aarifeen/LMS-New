import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteStudent = ({ id, studentId }) => {
  const queryClient = useQueryClient();
  const deleteRequestItem = `http://localhost:8080/deleteStudent/${id}/${studentId}`;

  return useMutation(() => axios.delete(deleteRequestItem), {
    onSuccess: async () => {
      queryClient.invalidateQueries();
    },
    onError: async () => {
      console.log("error");
    },
  });
};

export default useDeleteStudent;
