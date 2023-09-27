import { toast } from "react-toastify";
import fromDatabase from "../API/database";

const getUser = async () => {
  try {
    const response = await fromDatabase("GET", "/getUser");
    if (!response.error) {
      localStorage.setItem("user", true);
    } else {
      localStorage.setItem("user", false);
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

const addToWatchlist = async (dataToPost) => {
  let user = localStorage.getItem("user");
  if (user === "true") {
    const data = await fromDatabase("POST", "/addToWatchlist", dataToPost);
    toast(data.added ? "Added" : "Removed", {
      position: "top-right",
      autoClose: 300,
      theme: "dark",
    });
    if (data.added) return true;
    else return false;
  }
};

const setWatchlist = async (id) => {
  let user = localStorage.getItem("user");
  if (user === "true") {
    try {
      const response = await getUser();
      const inWatchlist = response.resFromDB.watchlist.some(
        (value) => value.id === id
      );
      if (inWatchlist) return true;
      else return false;
    } catch (error) {}
  }
};

const logout = async () => {
  let user = localStorage.getItem("user");
  if (user === "true") {
    await fromDatabase("GET", "/logout");
    localStorage.setItem("user", false);
    toast("Logged out", {
      position: "top-right",
      autoClose: 300,
      theme: "dark",
    });
    window.location.reload();
  }
};

export { addToWatchlist, setWatchlist, getUser, logout };
