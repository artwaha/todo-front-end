import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/tasks";

export const getInvitations = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/invitations`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
  }
};

export const getCollaboratingTasks = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${userId}/collaborating`
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
  }
};

export const getRejectedTasks = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/rejected`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
  }
};

export const getAllTasks = async (userId) => {
  try {
    // const response = await axios.get(`${BASE_URL}/users/${1000}`);
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
    // return [];
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
    // return null;
  }
};

export const getDoneTasks = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}/done`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
  }
};

export const getPendingTasks = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}/pending`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return [];
  }
};

export const getTaskDetails = async (taskId, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${taskId}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error: error.message });
    return {};
  }
};

export const countTasks = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/count`);
    return response.data;
  } catch (error) {
    console.log({ layer: "SERVICE", error: error.message });
    return {};
  }
};

export const updateTask = async (task, taskId, userId) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${taskId}/users/${userId}`,
      task
    );
    return response.data;
  } catch (error) {
    console.log({ layer: "SERVICE", error: error.message });
    return {};
  }
};

export const saveTask = async (task) => {
  try {
    const response = await axios.post(BASE_URL, task);
    return response.data;
  } catch (error) {
    console.log({ layer: "SERVICE", error: error.message });
    return {};
  }
};
export const deleteTask = async (taskId, userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${taskId}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log({ layer: "SERVICE", error: error.message });
    return {};
  }
};
