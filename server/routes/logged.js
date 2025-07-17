import { Router } from "express";
import { checkUser } from "../controllers/user_check.js";

const loggedRoute = Router();

loggedRoute.post("/", checkUser, (req, res) => {
  console.log(res.username);
  res.json(res.username);
});

export { loggedRoute };
//     console.log("carajo:", data);
