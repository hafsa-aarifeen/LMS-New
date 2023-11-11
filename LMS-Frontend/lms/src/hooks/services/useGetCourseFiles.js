import axios from "axios";

const FetchCourseFiles = async ({ courseId }) => {
  try {
    const response = await axios.get(`/api/files/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default FetchCourseFiles;
