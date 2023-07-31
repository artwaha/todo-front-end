import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/tasks";

export const getAllTasks = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error });
  }
};

export const getDoneTasks = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}/done`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error });
  }
};

export const getPendingTasks = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}/pending`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SERVICE", error });
  }
};

export const getTaskDetails = async (taskId, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${taskId}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const countTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/1/count`);
    return response.data;
  } catch (error) {
    console.log({ layer: "SERVICE", error });
  }
};
