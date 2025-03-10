import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:6100";

const SignIn = () => {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${BASE_URL}/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.user?.role == "user") {
      navigate("/allowed");
    } else {
      navigate("/not");
    }
  };

  return (
    <div className="">
      <div className="heading">Login</div>
      <form onSubmit={handleSubmit} className="formContainer">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SignIn;
