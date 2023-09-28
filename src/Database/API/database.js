import axios from "axios";

console.log();

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const fromDatabase = async (method, endPoint, dataToPost) => {
  try {
    if (method == "GET") {
      const { data } = await axios.get(`${BASE_URL}${endPoint}`, {
        withCredentials: true,
      });
      return data;
    } else if (method == "POST") {
      const { data } = await axios.post(`${BASE_URL}${endPoint}`, dataToPost, {
        withCredentials: true,
      });
      return data;
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export default fromDatabase;
