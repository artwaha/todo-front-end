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

export const removeCollaborator = async (collaborator) => {
  try {
    const response = await axios.patch(`${BASE_URL}/remove`, collaborator);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removePendingInvitation = async (invitation) => {
  try {
    const response = await axios.patch(`${BASE_URL}/pending-invitation/remove`, invitation);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
