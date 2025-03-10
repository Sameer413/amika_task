import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:6100";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${BASE_URL}/register`,
      {
        email: email,
        password: password,
        role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);
  };

  return (
    <div className="">
      <div className="heading">Register Here</div>
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="subscriber">subscriber</option>
        </select>
        <button type="submit">submit</button>
      </form>

      <button onClick={() => navigate("login")}>login</button>
    </div>
  );
};

export default Signup;
