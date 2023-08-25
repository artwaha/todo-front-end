import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/users";

export const getUsersToInvite = async (userId, taskId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
  }
};

export const getPendingInvitations = async (userId, taskId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${userId}/tasks/${taskId}/pending`
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
  }
};
