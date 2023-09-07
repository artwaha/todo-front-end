import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/users";

export const getUsersToInvite = async (userId, taskId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error({ layer: "USER-SERVICE", error: error.message });
    return [];
  }
};

export const login = async (username, password) => {
  try {
    const loginRequest = { username, password };
    const response = await axios.post(`${BASE_URL}/login`, loginRequest);
    const loggedOnUser = JSON.stringify(response.data);
    localStorage.setItem("logged-on-user", loggedOnUser);
    return response.data;
  } catch (error) {
    console.error({ layer: "USER-SERVICE", error: error.message });
    return {};
  }
};

export const getPendingInvitations = async (userId, taskId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${userId}/tasks/${taskId}/pending`
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "USER-SERVICE", error: error.message });
    return [];
  }
};
