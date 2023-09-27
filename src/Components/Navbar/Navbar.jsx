import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.scss";
import {
  AiFillFire,
  AiFillHeart,
  AiOutlineFire,
  AiOutlineHeart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUser } from "../../Database/Controllers/Database";

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const url = window.location.href.split("/")[3];
  useEffect(() => {
    (async () => {
      try {
        const response = await getUser();
        setLoggedInUser(response.resFromDB);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="navbar">
        <Link to={"/"}>
          <div className="logo"></div>
        </Link>
        <div className="icons">
          <Link to={"discover"} className="discover">
            {url == "discover" ? <AiFillFire /> : <AiOutlineFire />}
          </Link>
          {user ? (
            <Link to={"/watchlist"}>
              <div className="loggedInUser">
                <img src={loggedInUser.picture} alt="" />
              </div>
            </Link>
          ) : (
            <Link to={"login"} className="discover">
              {url == "login" ? <AiFillHeart /> : <AiOutlineHeart />}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;