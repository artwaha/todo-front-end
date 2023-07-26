import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/users";

export const getUsersToInvite = async (userId, taskId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/tasks/${taskId}`);
    // console.log(response.data);
    return response.data;
    // return [];
  } catch (error) {
    console.error(error);
  }
};
