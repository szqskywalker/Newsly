import React, { useState } from "react";
import "./LoginForm.css";

async function callVerifyAPI(userid, password) {
  try {
    const response = await fetch("http://localhost:8000/get_user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userid, password: password }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify user");
    }

    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Error verifying user:", error);
  }
}

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (!isSignup) {
      await callVerifyAPI(formData.username, formData.password);
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
