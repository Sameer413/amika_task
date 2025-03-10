import jwt from "jsonwebtoken";
import UserModel from "./userModel.js";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      message: "Not Authenticated",
    });
  }

  const { email } = jwt.verify(token, "SecretEnvKey");

  req.user = await UserModel.findOne({
    email,
  });

  next();
};

export const isUser = (req, res, next) => {
  if (req.user?.role === "user") {
    next();
  }

  return res.status(400).json({
    message: "You are not allowed to access the resources.",
  });
};
