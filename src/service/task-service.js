import axios from "axios";
const taskModel = require("../data/task-data");
const BASE_URL = "http://localhost:8080/api/v1/tasks";

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    console.log("All Tasks: ", response.data);
    return taskModel.allTasks();
  } catch (error) {
    console.error({ layer: "SERVICE", error });
  }
};

export const getDoneTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/done`);
    console.log("Done Tasks: ",response.data);
    return taskModel.doneTasks();
  } catch (error) {
    console.error({ layer: "SERVICE", error });
  }
};

export const getPendingTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    console.log("Pending Tasks: ",response.data);
    return taskModel.pendingTasks();
  } catch (error) {
    console.error({ layer: "SERVICE", error });
  }
};

export const getTaskDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?id=${id}`);
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
};

export const countTasks = () => {
  try {
    return taskModel.countTasks();
  } catch (error) {
    console.log({ layer: "SERVICE", error });
  }
};
