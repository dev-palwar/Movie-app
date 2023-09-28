import React from "react";
import "../Login/Login.scss";

const Login = () => {
  document.title = "Login";
  return (
    <>
      <a href={process.env.REACT_APP_BACKEND_AUTH}>
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
      </a>
    </>
  );
};

export default Login;
