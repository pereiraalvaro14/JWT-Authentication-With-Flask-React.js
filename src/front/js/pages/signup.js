import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const path = window.location.pathname;

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit() {
    if (email == "" || password == "") {
      actions.showToast("don't leave fields on blank!");
      return;
    }
    console.log(window.location.pathname);
    if (window.location.pathname == "/login") {
      logIn();
    } else {
      signUp();
    }
  }

  async function signUp() {
    let data = await actions.signUp(email, password);
    console.log("data---> ", data);
    if (data.data == "saved") {
      actions.showToast("User saved");
    } else {
      actions.showToast(
        "Error saving user, maybe email or username already exists??"
      );
    }
  }

  async function logIn() {
    let data = await actions.login(email, password);
    if (data == "error") {
      actions.showToast(
        "Error logging user, maybe user does not exists in database"
      );
    } else {
      // actions.showToast("user logged in!");
      actions.setToken(data);
      window.location.href = "/private";
    }
  }

  return (
    <div className="signupContainer">
      <div className="title">
        <h1>{path == "/signup" ? "Sign up" : "Log in"}</h1>
      </div>
      <div>
        {path == "/signup" && (
          <div>
            Already registered? <Link to="/login">Log In</Link>
          </div>
        )}
        {path == "/login" && (
          <div>
            Not registered? <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Email address or Username</label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          value={email}
          onChange={handleEmail}
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlInput2"
          value={password}
          onChange={handlePassword}
          placeholder=""
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        {path == "/signup" ? "Sign up" : "Log in"}
      </button>
    </div>
  );
};
