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

export const register = async (name, email, password) => {
  try {
    const newUser = { name, email, password };
    const response = await axios.post(`${BASE_URL}`, newUser);
    const loggedOnUser = JSON.stringify(response.data);
    localStorage.setItem("logged-on-user", loggedOnUser);
    return response.data;
  } catch (error) {
    console.error({ layer: "USER-SERVICE", error: error.message });
    return {};
  }
};

export const getLoggedOnUser = () => {
  const logged_on_user = localStorage.getItem("logged-on-user");
  const stored_logged_on_user = JSON.parse(logged_on_user);
  const userId = stored_logged_on_user === null ? 0 : stored_logged_on_user.id;
  return userId;
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
