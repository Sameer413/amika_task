import express from "express";
import mongoose from "mongoose";
import UserModel from "./userModel.js";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "machineTest",
    })
    .then(() => {
      console.log("db connected");
    });
};

app.listen(6100, () => {
  console.log("Server is running");
  connectDB();
});

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Enter all field",
      });
    }

    const user = await UserModel.create({
      email: email,
      password: password,
      role,
    });

    if (!user) {
      return res.status(400).json({
        message: "Faild to create a user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Enter all field",
      });
    }

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found with the email",
      });
    }

    const match = user.password.toString() === password.toString();

    console.log(user.password, "  ", password);

    if (!match)
      return res.status(400).json({
        message: "Enter correct password",
      });

    const token = jwt.sign({ email }, "SecretEnvKey", { expiresIn: "1d" });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({
      success: true,
      message: "User Logged In",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
