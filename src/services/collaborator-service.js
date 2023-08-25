import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/collaborators";

export const getTaskCollaborators = async (userId, taskId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tasks/${taskId}/users/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
  }
};

export const addCollaborator = async (collaborator) => {
  try {
    const response = await axios.post(`${BASE_URL}`, collaborator);
    return response.data;
    // console.log(usersToInvite);
  } catch (error) {
    console.log({ layer: "SERVICE", error: error.message });
    return {};
  }
};

export const inviteUser = async (usersToInvite) => {
  try {
    const response = await axios.patch(`${BASE_URL}/invite`, usersToInvite);
    return response.data;
    // console.log(usersToInvite);
  } catch (error) {
    console.log({ layer: "SERVICE", error: error.message });
    return {};
  }
};

export const removeCollaborator = async (collaborators) => {
  try {
    const response = await axios.patch(`${BASE_URL}/remove`, collaborators);
    return response.data;
    // console.log(collaborators);
  } catch (error) {
    console.log({ layer: "SERVICE", error: error.message });
    return {};
  }
};

export const removePendingInvitation = async (pendingInvitations) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/pending-invitation/remove`,
      pendingInvitations
    );
    return response.data;
    // console.log(pendingInvitations);
  } catch (error) {
    console.log({ layer: "SERVICE", error: error.message });
    return {};
  }
};
