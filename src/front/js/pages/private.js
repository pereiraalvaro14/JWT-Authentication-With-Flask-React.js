import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");

  const logout = () => {
    console.log("logging out");
    localStorage.clear();
    window.location.href = "/login";
  };

  const getProtectedUser = async () => {
    if (email != "") return;
    let user = await actions.getProtectedUser(isLoggedIn);
    setEmail(user.username);
  };

  let isLoggedIn = actions.getToken();
  if (!isLoggedIn) {
    console.log(isLoggedIn);
    return <Navigate replace to="/login" />;
  } else {
    getProtectedUser();
    return (
      <div className="signupContainer">
        <div className="title">
          <h1>This content is private, Welcome {email}</h1>
          <p>
            Email (username) is being fetched via protected API using a jwt
            token
          </p>

          <button onClick={() => logout()}>Log Out</button>
        </div>
      </div>
    );
  }
};
