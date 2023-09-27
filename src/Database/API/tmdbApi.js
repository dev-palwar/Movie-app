import axios from "axios";

const fetchData = async (param, endPoint) => {
  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3${endPoint}`,
      params: {
        ...param,
      },
      headers: {
        accept: "application/json",
        Authorization:
          `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
