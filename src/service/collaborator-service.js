import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/collaborators";

export const getTaskCollaborators = async (userId, taskId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tasks/${taskId}/users/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const inviteUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
