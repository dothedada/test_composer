import { Router } from "express";
import { checkCredentials } from "../controllers/user_check.js";

const loggedRoute = Router();

loggedRoute.post("/", checkCredentials, (req, res) => {
  res.json({ username: res.username });
});

export { loggedRoute };
