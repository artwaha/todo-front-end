import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/collaborators";

export const getTaskCollaborators = async (userId, taskId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tasks/${userId}/users/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
