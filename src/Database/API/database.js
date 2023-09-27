import axios from "axios";

const BASE_URL = "https://reelink.onrender.com";

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
