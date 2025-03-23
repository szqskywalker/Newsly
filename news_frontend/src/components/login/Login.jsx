import React, { useState } from "react";
import { callVerifyAPI, callNewUserAPI } from "../../api";
import "./LoginForm.css";

const defaultFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Login({ proceed }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [responseMessage, setResponseMessage] = useState("");

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setResponseMessage("");
    setFormData(defaultFormData);
  };

  const handleChange = (e) => {
    setResponseMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (!isSignup) {
      await callVerifyAPI(
        formData.username,
        formData.password,
        setResponseMessage,
        proceed
      );
    } else {
      if (formData.confirmPassword != formData.password) {
        setResponseMessage("Passwords Do Not Match");
      } else {
        console.log("Calling the api");
        await callNewUserAPI(
          formData.username,
          formData.email,
          formData.password,
          setResponseMessage,
          proceed
        );
      }
    }
  };

  function renderForm() {
    return (
      <form onSubmit={submitForm}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter Username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        {isSignup && (
          <>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {isSignup && (
          <>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="Enter Password Again"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </>
        )}

        <input type="submit" value={isSignup ? "Sign Up" : "Login"} />
      </form>
    );
  }

  return (
    <div id="login-form">
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>
      {renderForm()}
      {responseMessage && <p className="response-message">{responseMessage}</p>}
      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button type="button" onClick={toggleForm} className="toggle-button">
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default Login;
