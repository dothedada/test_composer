import { Router } from "express";
import { setUser } from "../controllers/user_set.js";

const signUpRoute = Router();

signUpRoute.post("/", setUser, (req, res) => {
  res.json({
    success: res.success,
    message: res.message,
    username: res.username,
  });
});

export { signUpRoute };
